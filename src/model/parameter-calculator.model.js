import CalculationContext from "./calculation-context.model";
import CalculationResult from "./calculation-result.model";
import Modifier from "./modifier.model";
import ParameterSet from "./parameter-set.model";

class ParameterCalculator {
  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get targetStats() {
    return this.data.targetStats || ["hp", "attack", "defense", "accuracy", "mobility"];
  }

  calculate(baseParameters, modifiers = [], context = new CalculationContext()) {
    const base = baseParameters instanceof ParameterSet ? baseParameters : new ParameterSet({ data: baseParameters || {} });
    const activeModifiers = modifiers
      .map((item) => (item instanceof Modifier ? item : new Modifier({ data: item || {} })))
      .filter((modifier) => context.isModifierActive(modifier))
      .sort((a, b) => a.priority - b.priority);

    const finalStats = {};
    const breakdown = {};

    this.targetStats.forEach((stat) => {
      const baseValue = base.getValue(stat);
      const statModifiers = activeModifiers.filter((modifier) => this.isTargetStat(modifier.stat, stat));
      const flatTotal = statModifiers
        .filter((modifier) => modifier.operation === Modifier.OPERATION_FLAT)
        .reduce((sum, modifier) => sum + modifier.value, 0);
      const rateTotal = statModifiers
        .filter((modifier) => modifier.operation === Modifier.OPERATION_RATE)
        .reduce((sum, modifier) => sum + modifier.value, 0);

      const beforeRate = baseValue + flatTotal;
      const rawFinal = beforeRate * (1 + rateTotal / 100);
      const finalValue = this.applyRound(rawFinal, context.roundMode);

      finalStats[stat] = finalValue;
      breakdown[stat] = statModifiers.map((modifier) => ({
        id: modifier.id,
        source: modifier.source,
        operation: modifier.operation,
        value: modifier.value,
        condition: modifier.condition,
      }));
    });

    return new CalculationResult({
      data: {
        finalStats,
        breakdown,
      },
    });
  }

  isTargetStat(modifierStat, targetStat) {
    if (Array.isArray(modifierStat)) {
      return modifierStat.includes(targetStat);
    }
    return modifierStat === targetStat || modifierStat === "all";
  }

  applyRound(value, mode) {
    if (mode === CalculationContext.ROUND_CEIL) {
      return Math.ceil(value);
    }
    if (mode === CalculationContext.ROUND_ROUND) {
      return Math.round(value);
    }
    return Math.floor(value);
  }
}

export default ParameterCalculator;
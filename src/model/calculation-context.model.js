import Modifier from "./modifier.model";

class CalculationContext {
  static get ROUND_FLOOR() {
    return "floor";
  }

  static get ROUND_CEIL() {
    return "ceil";
  }

  static get ROUND_ROUND() {
    return "round";
  }

  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get slottedAsFinisher() {
    return Boolean(this.data.slottedAsFinisher);
  }

  get roundMode() {
    return this.data.roundMode || CalculationContext.ROUND_FLOOR;
  }

  isModifierActive(modifier) {
    if (!modifier.enabled) {
      return false;
    }

    const condition = modifier.condition;
    if (typeof condition === "function") {
      return Boolean(condition(this));
    }

    if (condition === Modifier.CONDITION_ALWAYS) {
      return true;
    }

    if (condition === Modifier.CONDITION_WHEN_SLOTTED_AS_FINISHER) {
      return this.slottedAsFinisher;
    }

    return false;
  }
}

export default CalculationContext;
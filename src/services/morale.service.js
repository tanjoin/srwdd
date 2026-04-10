import SkillEffectParser from '../model/skill-effect-parser.model.js';

export const MORALE_VALUES = [100, 110, 120, 130, 140, 150, 160, 170];

export function getMoraleRate(morale = 100) {
  return Math.max(0, Math.floor((Number(morale) - 100) / 10) * 3);
}

export function applyMoraleToTotals(totals, morale = 100) {
  const moraleRate = getMoraleRate(morale);
  const attack = SkillEffectParser.applyRateBonus(totals.attack, moraleRate);
  const defense = SkillEffectParser.applyRateBonus(totals.defense, moraleRate);
  const accuracy = SkillEffectParser.applyRateBonus(totals.accuracy, moraleRate);
  const mobility = SkillEffectParser.applyRateBonus(totals.mobility, moraleRate);
  const baseHp = Number(totals.baseHp) || 0;
  const partsIncreaseHp = Number(totals.partsIncreaseHp) || 0;

  return {
    ...totals,
    morale: Number(morale) || 100,
    moraleRate,
    attack,
    defense,
    accuracy,
    mobility,
    combatPower: Math.round(
      (baseHp / 9) +
      (partsIncreaseHp * (2 / 3)) +
      attack +
      defense +
      (accuracy * 10) +
      (mobility * 10)
    ),
  };
}
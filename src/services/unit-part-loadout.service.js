import SkillEffectParser from '../model/skill-effect-parser.model.js';

export function evaluateUnitPartLoadout({ unit, pilot, main = null, finishers = [], subs = [] }) {
  const entries = buildLoadoutEntries({ main, finishers, subs });
  const statTotals = sumLoadoutStatTotals(entries);
  const slotRateBonuses = extractLoadoutRateBonusesBySlot(entries);
  const rateBonuses = mergeRateBonuses(
    pilot?.textEffectRateBonuses || SkillEffectParser.createEmptyBonusSet(),
    slotRateBonuses.main,
    slotRateBonuses.finisher,
    slotRateBonuses.sub,
  );

  const attack = SkillEffectParser.applyRateBonus(
    (Number(unit?.attack) || 0) + (Number(pilot?.totalAttack) || 0) + statTotals.attack,
    rateBonuses.attack,
  );
  const defense = SkillEffectParser.applyRateBonus(
    (Number(unit?.defense) || 0) + (Number(pilot?.totalDefense) || 0) + statTotals.defense,
    rateBonuses.defense,
  );
  const accuracy = SkillEffectParser.applyRateBonus(
    (Number(unit?.accuracy) || 0) + (Number(pilot?.totalAccuracy) || 0) + statTotals.accuracy,
    rateBonuses.accuracy,
  );
  const mobility = SkillEffectParser.applyRateBonus(
    (Number(unit?.mobility) || 0) + (Number(pilot?.totalMobility) || 0) + statTotals.mobility,
    rateBonuses.mobility,
  );
  const hp = (Number(unit?.hp) || 0) + statTotals.hp;
  const baseHp = Number(unit?.data?.baseHp ?? unit?.baseHp ?? unit?.hp) || 0;
  const partsIncreaseHp = (Number(unit?.data?.partsIncreaseHp ?? unit?.partsIncreaseHp ?? 0) || 0) + statTotals.hp;
  const combatPower = Math.round(
    (baseHp / 9) +
    (partsIncreaseHp * (2 / 3)) +
    attack +
    defense +
    (accuracy * 10) +
    (mobility * 10)
  );

  return {
    entries,
    statTotals,
    rateBonuses,
    pilotRateBonuses: pilot?.textEffectRateBonuses || SkillEffectParser.createEmptyBonusSet(),
    mainRateBonuses: slotRateBonuses.main,
    finisherRateBonuses: slotRateBonuses.finisher,
    subRateBonuses: slotRateBonuses.sub,
    hp,
    baseHp,
    partsIncreaseHp,
    attack,
    defense,
    accuracy,
    mobility,
    combatPower,
  };
}

export function buildLoadoutEntries({ main = null, finishers = [], subs = [] }) {
  return [
    ...(main ? [createLoadoutEntry(main, 'mainSlot')] : []),
    ...finishers.filter(Boolean).map((part) => createLoadoutEntry(part, 'finisherSlot')),
    ...subs.filter(Boolean).map((part) => createLoadoutEntry(part, 'subSlot')),
  ];
}

export function getTargetValue(loadoutResult, targetKey) {
  if (targetKey === 'combatPower') return Number(loadoutResult?.combatPower) || 0;
  return Number(loadoutResult?.[targetKey]) || 0;
}

function sumLoadoutStatTotals(entries) {
  return entries.reduce((acc, entry) => {
    if (entry.slotKey === 'finisherSlot') return acc;
    acc.hp += Number(entry.part?.hp) || 0;
    acc.attack += Number(entry.part?.attack) || 0;
    acc.defense += Number(entry.part?.defense) || 0;
    acc.accuracy += Number(entry.part?.accuracy) || 0;
    acc.mobility += Number(entry.part?.mobility) || 0;
    return acc;
  }, { hp: 0, attack: 0, defense: 0, accuracy: 0, mobility: 0 });
}

function extractLoadoutRateBonusesBySlot(entries) {
  return entries.reduce((acc, entry) => {
    const slot = entry.slot || {};
    const effectText = [
      String(slot.description || '').trim(),
      ...(Array.isArray(slot.effect) ? slot.effect.map((item) => String(item || '').trim()) : []),
    ].filter(Boolean).join('。');
    const bonuses = SkillEffectParser.extractParameterRateBonuses(effectText);
    const target = entry.slotKey === 'mainSlot'
      ? acc.main
      : entry.slotKey === 'finisherSlot'
        ? acc.finisher
        : acc.sub;
    target.attack += bonuses.attack;
    target.defense += bonuses.defense;
    target.accuracy += bonuses.accuracy;
    target.mobility += bonuses.mobility;
    return acc;
  }, {
    main: SkillEffectParser.createEmptyBonusSet(),
    finisher: SkillEffectParser.createEmptyBonusSet(),
    sub: SkillEffectParser.createEmptyBonusSet(),
  });
}

function mergeRateBonuses(...bonusSets) {
  return bonusSets.reduce((acc, bonuses) => {
    acc.attack += Number(bonuses?.attack) || 0;
    acc.defense += Number(bonuses?.defense) || 0;
    acc.accuracy += Number(bonuses?.accuracy) || 0;
    acc.mobility += Number(bonuses?.mobility) || 0;
    return acc;
  }, SkillEffectParser.createEmptyBonusSet());
}

function createLoadoutEntry(part, slotKey) {
  return {
    part,
    slotKey,
    slot: getSelectedSlot(part, slotKey),
  };
}

function getSelectedSlot(part, slotKey) {
  if (!part) return {};
  if (slotKey === 'mainSlot') return part.mainSlot || {};
  if (slotKey === 'finisherSlot') return part.finisherSlot || {};
  if (slotKey === 'subSlot') return part.subSlot || {};
  return {};
}
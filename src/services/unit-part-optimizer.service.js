import { isFinisherSlotEligible, isMainSlotEligible, isPartCompatibleWithUnit } from './unit-part-slot.service.js';
import { evaluateUnitPartLoadout, getTargetValue } from './unit-part-loadout.service.js';
import { applyMoraleToTotals } from './morale.service.js';

const OPTIMIZER_TARGETS = [
  { key: 'hp', label: 'HP最大' },
  { key: 'attack', label: '攻撃最大' },
  { key: 'defense', label: '防御最大' },
  { key: 'accuracy', label: '照準最大' },
  { key: 'mobility', label: '運動最大' },
  { key: 'combatPower', label: '戦力値最大' },
];

export function buildOptimizerRows({ units, pilotById, unitPartsList, selectedMorale = 100 }) {
  return units.flatMap((unit) => {
    const pilot = pilotById.get(String(unit.pilotId));
    if (!pilot) return [];

    const compatibleParts = unitPartsList.filter((part) => isPartCompatibleWithUnit(part, unit.id, pilot.id));

    return OPTIMIZER_TARGETS.map((target) => buildOptimizerRow(unit, pilot, compatibleParts, target, selectedMorale));
  });
}

function buildOptimizerRow(unit, pilot, parts, target, selectedMorale) {
  const main = pickBestMain(parts.filter(isMainSlotEligible), unit, pilot, target.key, selectedMorale);
  const finishers = pickBestFinishers(excludeUsed(parts.filter(isFinisherSlotEligible), [main]), unit, pilot, target.key, main, selectedMorale);
  const baseTotals = evaluateUnitPartLoadout({ unit, pilot, main, finishers, subs: [], morale: selectedMorale });
  const totals = applyMoraleToTotals(baseTotals, selectedMorale);

  return {
    unitId: String(unit.id || ''),
    unitName: unit.name || '',
    pilotName: pilot.name || '',
    targetKey: target.key,
    targetLabel: target.label,
    mainPartName: formatPartName(main, 'mainSlot'),
    mainPartDisplay: formatPartName(main, 'mainSlot'),
    finisherPart1Name: formatPartName(finishers[0], 'finisherSlot'),
    finisherPart2Name: formatPartName(finishers[1], 'finisherSlot'),
    finisherPartNames: finishers.map((part) => formatPartName(part, 'finisherSlot')).filter(Boolean).join(', '),
    finisherPartDisplays: finishers.map((part) => formatPartName(part, 'finisherSlot')).filter(Boolean),
    finisherCount: finishers.length,
    morale: totals.morale,
    moraleRate: totals.moraleRate,
    textEffectAttackRate: totals.rateBonuses.attack,
    textEffectDefenseRate: totals.rateBonuses.defense,
    textEffectAccuracyRate: totals.rateBonuses.accuracy,
    textEffectMobilityRate: totals.rateBonuses.mobility,
    mainTextEffectAttackRate: totals.mainRateBonuses.attack,
    mainTextEffectDefenseRate: totals.mainRateBonuses.defense,
    mainTextEffectAccuracyRate: totals.mainRateBonuses.accuracy,
    mainTextEffectMobilityRate: totals.mainRateBonuses.mobility,
    finisherTextEffectAttackRate: totals.finisherRateBonuses.attack,
    finisherTextEffectDefenseRate: totals.finisherRateBonuses.defense,
    finisherTextEffectAccuracyRate: totals.finisherRateBonuses.accuracy,
    finisherTextEffectMobilityRate: totals.finisherRateBonuses.mobility,
    hp: totals.hp,
    attack: totals.attack,
    defense: totals.defense,
    accuracy: totals.accuracy,
    mobility: totals.mobility,
    combatPower: totals.combatPower,
    targetValue: getTargetValue(totals, target.key),
  };
}

function pickBestMain(parts, unit, pilot, targetKey, selectedMorale) {
  return [...parts].sort((left, right) => {
    const rightValue = getTargetValue(applyMoraleToTotals(
      evaluateUnitPartLoadout({ unit, pilot, main: right, finishers: [], subs: [], morale: selectedMorale }),
      selectedMorale,
    ), targetKey);
    const leftValue = getTargetValue(applyMoraleToTotals(
      evaluateUnitPartLoadout({ unit, pilot, main: left, finishers: [], subs: [], morale: selectedMorale }),
      selectedMorale,
    ), targetKey);
    return rightValue - leftValue;
  })[0] || null;
}

function pickBestFinishers(parts, unit, pilot, targetKey, main, selectedMorale) {
  return chooseUpToCombinations(parts, 2)
    .sort((left, right) => {
      const rightValue = getTargetValue(applyMoraleToTotals(
        evaluateUnitPartLoadout({ unit, pilot, main, finishers: right, subs: [], morale: selectedMorale }),
        selectedMorale,
      ), targetKey);
      const leftValue = getTargetValue(applyMoraleToTotals(
        evaluateUnitPartLoadout({ unit, pilot, main, finishers: left, subs: [], morale: selectedMorale }),
        selectedMorale,
      ), targetKey);
      if (rightValue !== leftValue) return rightValue - leftValue;
      return right.length - left.length;
    })[0] || [];
}

function excludeUsed(parts, usedParts) {
  const usedIds = new Set(usedParts.filter(Boolean).map((part) => String(part.id)));
  return parts.filter((part) => !usedIds.has(String(part.id)));
}

function chooseUpToCombinations(items, maxCount) {
  const results = [[]];

  for (let count = 1; count <= maxCount; count += 1) {
    results.push(...chooseCombinations(items, count));
  }

  return results;
}

function chooseCombinations(items, count) {
  if (count <= 0) return [[]];
  if (items.length < count) return [];

  const results = [];

  function walk(startIndex, current) {
    if (current.length === count) {
      results.push([...current]);
      return;
    }

    for (let index = startIndex; index <= items.length - (count - current.length); index += 1) {
      current.push(items[index]);
      walk(index + 1, current);
      current.pop();
    }
  }

  walk(0, []);
  return results;
}

function formatPartName(part, slotKey) {
  if (!part) return '';
  const baseName = part.name || '';
  const slotName = part?.[slotKey]?.name || '';
  return baseName || slotName || '';
}
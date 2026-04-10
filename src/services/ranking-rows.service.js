import { isFinisherSlotEligible, isMainSlotEligible, isPartCompatibleWithUnit } from './unit-part-slot.service.js';
import { applyMoraleToTotals } from './morale.service.js';
import { evaluateUnitPartLoadout } from './unit-part-loadout.service.js';

export function buildRankingRows({ units, pilotById, unitPartsList, selectedMorale = 100 }) {
  return units.flatMap((u) => {
    const pilot = pilotById.get(String(u.pilotId));
    if (!pilot) return [];

    const compatibleParts = unitPartsList.filter((part) => isPartCompatibleWithUnit(part, u.id, pilot.id));

    const combinations = buildRankingPartLoadoutCombinations(compatibleParts);

    return combinations.map((loadout) => buildRankingRow(u, pilot, loadout, selectedMorale));
  });
}

function buildRankingRow(unit, pilot, loadout, selectedMorale) {
  const baseTotals = evaluateUnitPartLoadout({ unit, pilot, main: loadout.main, finishers: loadout.finishers, subs: [], morale: selectedMorale });
  const totals = applyMoraleToTotals(baseTotals, selectedMorale);
  const movement = Number(unit.movement) || 0;
  const speed = Number(unit.speed) || 0;

  return {
    unitId: String(unit.id || ''),
    unitName: unit.name || '',
    pilotName: pilot.name || '',
    mainPartName: formatPartName(loadout.main, 'mainSlot'),
    finisherPart1Name: formatPartName(loadout.finishers[0], 'finisherSlot'),
    finisherPart2Name: formatPartName(loadout.finishers[1], 'finisherSlot'),
    finisherPartNames: loadout.finishers.map((part) => formatPartName(part, 'finisherSlot')).filter(Boolean).join(', '),
    finisherCount: loadout.finishers.length,
    combinationSize: loadout.parts.length,
    morale: totals.morale,
    moraleRate: totals.moraleRate,
    hp: totals.hp,
    baseHp: totals.baseHp,
    partsIncreaseHp: totals.partsIncreaseHp,
    movement,
    speed,
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
    attack: totals.attack,
    defense: totals.defense,
    accuracy: totals.accuracy,
    mobility: totals.mobility,
    total: totals.attack + totals.defense + totals.accuracy + totals.mobility,
    combatPower: totals.combatPower,
  };
}

function buildRankingPartLoadoutCombinations(parts) {
  const mainParts = parts.filter(isMainSlotEligible);
  const finisherParts = parts.filter(isFinisherSlotEligible);

  if (!mainParts.length) {
    return [{ main: null, finishers: [], parts: [] }];
  }

  const combinations = mainParts.flatMap((mainPart) => {
    const remainingAfterMain = finisherParts.filter((part) => String(part.id) !== String(mainPart.id));
    return chooseUpToCombinations(remainingAfterMain, 2).map((finishers) => ({
      main: mainPart,
      finishers,
      parts: [mainPart, ...finishers],
    }));
  });

  return dedupeLoadouts(combinations);
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
  return part.name || part?.[slotKey]?.name || '';
}

function dedupeLoadouts(loadouts) {
  const seen = new Set();
  return loadouts.filter((loadout) => {
    const key = [
      String(loadout.main?.id || ''),
      ...loadout.finishers.map((part) => String(part?.id || '')).sort(),
    ].join(':');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
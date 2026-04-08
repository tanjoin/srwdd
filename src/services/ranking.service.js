import { buildRankingRows } from './ranking-rows.service.js';
import { scoreAndSortRankingRows } from './ranking-score.service.js';
import { buildOptimizerRows } from './unit-part-optimizer.service.js';

export function buildScoredRankingRows({ units, pilotById, unitPartsList, rankingSort, compareValues }) {
  const rankingRows = buildRankingRows({ units, pilotById, unitPartsList });
  return scoreAndSortRankingRows({ rankingRows, rankingSort, compareValues });
}

export function buildBestUnitRankingRows(scoredRankingRows) {
  const bestByUnit = new Map();

  scoredRankingRows.forEach((row) => {
    const current = bestByUnit.get(row.unitId);
    if (!current || isBetterRankingRow(row, current)) {
      bestByUnit.set(row.unitId, row);
    }
  });

  return [...bestByUnit.values()].sort((a, b) => {
    if (Number(b.score) !== Number(a.score)) return Number(b.score) - Number(a.score);
    if (Number(b.finisherCount || 0) !== Number(a.finisherCount || 0)) {
      return Number(b.finisherCount || 0) - Number(a.finisherCount || 0);
    }
    if (Number(b.combinationSize || 0) !== Number(a.combinationSize || 0)) {
      return Number(b.combinationSize || 0) - Number(a.combinationSize || 0);
    }
    return String(a.unitName || '').localeCompare(String(b.unitName || ''), 'ja');
  });
}

export function buildUnitPartOptimizerRows({ units, pilotById, unitPartsList }) {
  return buildOptimizerRows({ units, pilotById, unitPartsList });
}

function isBetterRankingRow(candidate, current) {
  if (Number(candidate.score) !== Number(current.score)) {
    return Number(candidate.score) > Number(current.score);
  }
  if (Number(candidate.finisherCount || 0) !== Number(current.finisherCount || 0)) {
    return Number(candidate.finisherCount || 0) > Number(current.finisherCount || 0);
  }
  if (Number(candidate.combinationSize || 0) !== Number(current.combinationSize || 0)) {
    return Number(candidate.combinationSize || 0) > Number(current.combinationSize || 0);
  }
  return false;
}

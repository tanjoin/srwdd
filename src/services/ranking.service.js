import { buildRankingRows } from './ranking-rows.service.js';
import { scoreAndSortRankingRows } from './ranking-score.service.js';

export function buildScoredRankingRows({ units, pilotById, rankingSort, compareValues }) {
  const rankingRows = buildRankingRows({ units, pilotById });
  return scoreAndSortRankingRows({ rankingRows, rankingSort, compareValues });
}

export function scoreAndSortRankingRows({ rankingRows, rankingSort, compareValues }) {
  const rankingWeights = {
    hp: 0.15,
    attack: 0.22,
    defense: 0.22,
    accuracy: 0.18,
    mobility: 0.18,
    movement: 0.025,
    speed: 0.025,
  };

  const rankingFields = Object.keys(rankingWeights);
  const rankingFieldMax = rankingFields.reduce((acc, field) => {
    const maxValue = Math.max(...rankingRows.map(row => Number(row[field]) || 0), 0);
    acc[field] = maxValue > 0 ? maxValue : 1;
    return acc;
  }, {});

  return rankingRows
    .map(row => {
      const score = rankingFields.reduce((sum, field) => {
        const normalized = (Number(row[field]) || 0) / rankingFieldMax[field];
        return sum + (normalized * rankingWeights[field]);
      }, 0);

      return {
        ...row,
        score: Number((score * 100).toFixed(2)),
      };
    })
    .sort((a, b) => {
      const primary = compareValues(a, b, rankingSort.key, rankingSort.dir);
      if (primary !== 0) return primary;
      if (Number(b.finisherCount || 0) !== Number(a.finisherCount || 0)) {
        return Number(b.finisherCount || 0) - Number(a.finisherCount || 0);
      }
      if (Number(b.combinationSize || 0) !== Number(a.combinationSize || 0)) {
        return Number(b.combinationSize || 0) - Number(a.combinationSize || 0);
      }
      return String(a.unitName || '').localeCompare(String(b.unitName || ''), 'ja');
    });
}
export function renderRankingPage({ scoredRankingRows, bestUnitRankingRows = [], selectedMorale = 100, selectedMoraleRate = 0, rankingMoraleValues = [] }) {
  const topCombinationKeys = new Set();
  scoredRankingRows.forEach((row) => {
    const key = `${row.unitId || row.unitName}::${row.pilotName || ''}`;
    if (!topCombinationKeys.has(key)) {
      topCombinationKeys.add(key);
    }
  });

  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-2">
          <div>
            <h2 class="h6 mb-0">重み付きランキング（機体+パイロット+適合ユニットパーツ）</h2>
            <div class="small text-muted mt-1">気力${selectedMorale}を基準にランキングを再計算</div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <label for="ranking-morale-select" class="small text-muted">気力</label>
            <select id="ranking-morale-select" class="form-select form-select-sm">
              ${rankingMoraleValues.map((morale) => `<option value="${morale}" ${Number(morale) === Number(selectedMorale) ? 'selected' : ''}>気力${morale}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="card-body">
      ${scoredRankingRows.length === 0 ? `
        <div class="text-muted small">パイロット、または適合ユニットパーツが設定された機体がありません。</div>
      ` : `
      <div class="small text-muted mb-2">スコア重み: HP 15%、攻22%、防22%、照18%、運18%、移2.5%、速2.5%</div>
      <div class="small text-muted mb-2">ユニットパーツは適合機体・適合パイロットが一致するものだけで MAIN と必殺のみ組み合わせを生成</div>
      <div class="small text-muted mb-2">SUB は現状ランキング対象外</div>
      <div class="small text-muted mb-2">攻撃力・防御力・照準値・運動性は、機体+パイロット+ユニットパーツ合算後に装備スキルのテキスト効果を反映</div>
      <div class="small text-muted mb-2">気力補正: 100基準、10上昇ごとに攻撃力・防御力・照準値・運動性へ +3%（現在 +${selectedMoraleRate}%）</div>
      <div class="small text-muted mb-2">戦力値: 基礎HP/9 + パーツ増加HP×2/3 + 攻撃力 + 防御力 + 照準値×10 + 運動性×10</div>
      <div class="small text-muted mb-3">総組み合わせ数: ${scoredRankingRows.length}</div>
      <div class="card bg-light border-0 rounded-4 mb-3">
        <div class="card-body">
          <h3 class="h6 mb-3">機体ごとの最適組み合わせ</h3>
          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>機体</th>
                  <th>パイロット</th>
                  <th>MAIN</th>
                  <th>必殺1</th>
                  <th>必殺2</th>
                  <th>MAIN由来</th>
                  <th>必殺由来</th>
                  <th>気力補正</th>
                  <th>効果率 攻</th>
                  <th>効果率 防</th>
                  <th>効果率 照</th>
                  <th>効果率 運</th>
                  <th>戦力値</th>
                  <th>スコア</th>
                </tr>
              </thead>
              <tbody>
                ${bestUnitRankingRows.map((row, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${row.unitName}</td>
                    <td>${row.pilotName}</td>
                    <td>${row.mainPartName}</td>
                    <td>${row.finisherPart1Name || 'なし'}</td>
                    <td>${row.finisherPart2Name || 'なし'}</td>
                    <td>${formatRateSummary(row, 'main')}</td>
                    <td>${formatRateSummary(row, 'finisher')}</td>
                    <td>+${row.moraleRate}%</td>
                    <td>${row.textEffectAttackRate}%</td>
                    <td>${row.textEffectDefenseRate}%</td>
                    <td>${row.textEffectAccuracyRate}%</td>
                    <td>${row.textEffectMobilityRate}%</td>
                    <td>${row.combatPower}</td>
                    <td class="fw-semibold">${row.score}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th data-sort="unitName" class="sortable">機体</th>
            <th data-sort="pilotName" class="sortable">パイロット</th>
            <th data-sort="mainPartName" class="sortable">MAIN</th>
            <th data-sort="finisherPart1Name" class="sortable">必殺1</th>
            <th data-sort="finisherPart2Name" class="sortable">必殺2</th>
            <th>MAIN由来</th>
            <th>必殺由来</th>
            <th data-sort="moraleRate" class="sortable">気力補正</th>
            <th data-sort="textEffectAttackRate" class="sortable">効果率 攻</th>
            <th data-sort="textEffectDefenseRate" class="sortable">効果率 防</th>
            <th data-sort="textEffectAccuracyRate" class="sortable">効果率 照</th>
            <th data-sort="textEffectMobilityRate" class="sortable">効果率 運</th>
            <th data-sort="hp" class="sortable">HP</th>
            <th data-sort="attack" class="sortable">攻撃力</th>
            <th data-sort="defense" class="sortable">防御力</th>
            <th data-sort="accuracy" class="sortable">照準値</th>
            <th data-sort="mobility" class="sortable">運動性</th>
            <th data-sort="movement" class="sortable">移動力</th>
            <th data-sort="speed" class="sortable">スピード</th>
            <th data-sort="combatPower" class="sortable">戦力値</th>
            <th data-sort="score" class="sortable">スコア</th>
          </tr>
        </thead>
        <tbody>
          ${scoredRankingRows.map((row, idx) => `
            ${(() => {
              const combinationKey = `${row.unitId || row.unitName}::${row.pilotName || ''}`;
              const isTopCombinationRow = topCombinationKeys.has(combinationKey);
              if (isTopCombinationRow) {
                topCombinationKeys.delete(combinationKey);
              }
              return `
            <tr>
              <td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${idx + 1}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.unitName}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.pilotName}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.mainPartName}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.finisherPart1Name || 'なし'}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.finisherPart2Name || 'なし'}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${formatRateSummary(row, 'main')}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${formatRateSummary(row, 'finisher')}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">+${row.moraleRate}%</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.textEffectAttackRate}%</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.textEffectDefenseRate}%</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.textEffectAccuracyRate}%</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.textEffectMobilityRate}%</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.hp}</td>
              <td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.attack}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.defense}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.accuracy}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.mobility}</td>
              <td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.movement}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.speed}</td><td class="${isTopCombinationRow ? 'fw-semibold' : ''}">${row.combatPower}</td><td class="fw-semibold ${isTopCombinationRow ? 'text-decoration-underline' : ''}">${row.score}</td>
            </tr>
              `;
            })()}
          `).join('')}
        </tbody>
      </table>
      </div>
      `}
      </div>
    </div>
  `;
}

function formatRateSummary(row, source) {
  const attack = Number(row?.[`${source}TextEffectAttackRate`]) || 0;
  const defense = Number(row?.[`${source}TextEffectDefenseRate`]) || 0;
  const accuracy = Number(row?.[`${source}TextEffectAccuracyRate`]) || 0;
  const mobility = Number(row?.[`${source}TextEffectMobilityRate`]) || 0;
  return `攻${attack}% 防${defense}% 照${accuracy}% 運${mobility}%`;
}

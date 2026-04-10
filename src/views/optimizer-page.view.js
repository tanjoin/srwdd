export function renderOptimizerPage({ optimizerRows = [], selectedMorale = 100, selectedMoraleRate = 0, rankingMoraleValues = [] }) {
  const targetOrder = ['hp', 'attack', 'defense', 'accuracy', 'mobility', 'combatPower'];
  const groups = targetOrder
    .map((targetKey) => {
      const rows = optimizerRows
        .filter((row) => row.targetKey === targetKey)
        .map((row) => ({
          ...row,
          finisherPartLabel: row.finisherPartDisplays?.length ? row.finisherPartDisplays.join(', ') : 'なし',
        }))
        .sort((left, right) => {
          if (right.targetValue !== left.targetValue) return right.targetValue - left.targetValue;
          if (Number(right.finisherCount || 0) !== Number(left.finisherCount || 0)) {
            return Number(right.finisherCount || 0) - Number(left.finisherCount || 0);
          }
          return String(left.unitName || '').localeCompare(String(right.unitName || ''), 'ja');
        })
        .map((row, index) => ({ ...row, targetRank: index + 1 }));

      if (rows.length === 0) return null;
      return {
        targetKey,
        targetLabel: rows[0].targetLabel,
        rows,
      };
    })
    .filter(Boolean);

  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">ユニットパーツ最適化</h2>
      </div>
      <div class="card-body">
      ${optimizerRows.length === 0 ? `
        <div class="text-muted small">最適化対象の機体またはユニットパーツがありません。</div>
      ` : `
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
          <div>
            <div class="small text-muted">気力${selectedMorale}を基準に最適構成を再計算</div>
            <div class="small text-muted">気力補正: 100基準、10上昇ごとに攻撃力・防御力・照準値・運動性へ +3%（現在 +${selectedMoraleRate}%）</div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <label for="ranking-morale-select" class="small text-muted">気力</label>
            <select id="ranking-morale-select" class="form-select form-select-sm">
              ${rankingMoraleValues.map((morale) => `<option value="${morale}" ${Number(morale) === Number(selectedMorale) ? 'selected' : ''}>気力${morale}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="small text-muted mb-2">MAIN と必殺技のみで、各ステータスが最も高くなる構成を表示</div>
        <div class="small text-muted mb-2">MAIN と必殺技に同じユニットパーツは使用しない</div>
        <div class="small text-muted mb-3">表示順: HP / 攻撃 / 防御 / 照準 / 運動 / 戦力値</div>
        ${groups.map((group) => `
          <section class="mb-4">
            <h3 class="h6 mb-2">${group.targetLabel}</h3>
            <div class="table-responsive">
              <table class="table table-sm table-striped table-hover align-middle mb-0">
                <thead class="table-light">
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
                    <th>HP</th>
                    <th>攻撃力</th>
                    <th>防御力</th>
                    <th>照準値</th>
                    <th>運動性</th>
                    <th>戦力値</th>
                    <th>対象値</th>
                  </tr>
                </thead>
                <tbody>
                  ${group.rows.map((row) => `
                    <tr>
                      <td>${row.targetRank}</td>
                      <td>${row.unitName}</td>
                      <td>${row.pilotName}</td>
                      <td>${row.mainPartDisplay || 'なし'}</td>
                      <td>${row.finisherPart1Name || 'なし'}</td>
                      <td>${row.finisherPart2Name || 'なし'}</td>
                      <td>${formatRateSummary(row, 'main')}</td>
                      <td>${formatRateSummary(row, 'finisher')}</td>
                      <td>+${row.moraleRate}%</td>
                      <td>${row.textEffectAttackRate}%</td>
                      <td>${row.textEffectDefenseRate}%</td>
                      <td>${row.textEffectAccuracyRate}%</td>
                      <td>${row.textEffectMobilityRate}%</td>
                      <td>${row.hp}</td>
                      <td>${row.attack}</td>
                      <td>${row.defense}</td>
                      <td>${row.accuracy}</td>
                      <td>${row.mobility}</td>
                      <td>${row.combatPower}</td>
                      <td class="fw-semibold">${row.targetValue}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>
        `).join('')}
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
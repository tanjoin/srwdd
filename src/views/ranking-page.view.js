export function renderRankingPage({ scoredRankingRows }) {
  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">重み付きランキング（機体+パイロット）</h2>
      </div>
      <div class="card-body">
      ${scoredRankingRows.length === 0 ? `
        <div class="text-muted small">パイロットが設定された機体がありません。</div>
      ` : `
      <div class="small text-muted mb-2">スコア重み: HP 15%、攻22%、防22%、照18%、運18%、移2.5%、速2.5%</div>
      <div class="small text-muted mb-2">戦力値: 基礎HP/9 + パーツ増加HP×2/3 + 攻撃力 + 防御力 + 照準値×10 + 運動性×10</div>
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th data-sort="unitName" class="sortable">機体</th>
            <th data-sort="pilotName" class="sortable">パイロット</th>
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
            <tr>
              <td>${idx + 1}</td><td>${row.unitName}</td><td>${row.pilotName}</td><td>${row.hp}</td>
              <td>${row.attack}</td><td>${row.defense}</td><td>${row.accuracy}</td><td>${row.mobility}</td>
              <td>${row.movement}</td><td>${row.speed}</td><td>${row.combatPower}</td><td class="fw-semibold">${row.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      `}
      </div>
    </div>
  `;
}

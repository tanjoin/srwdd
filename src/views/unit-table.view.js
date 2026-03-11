export function renderUnitTable({ sortedUnits, pilotById }) {
  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">機体データ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="unit-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-unit" class="btn btn-sm btn-primary"><i class="bi bi-download me-1"></i>CSVエクスポート</button>
          </div>
        </div>
      </div>
      <div class="card-body"><div class="table-responsive"><table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th rowspan="3" data-sort="id" class="sortable">ID</th><th rowspan="3" data-sort="name" class="sortable">名前</th><th rowspan="3" data-sort="pilotId" class="sortable">パイロット</th>
            <th rowspan="3" data-sort="size" class="sortable">サイズ</th><th rowspan="3" data-sort="type" class="sortable">タイプ</th><th rowspan="3" data-sort="hp" class="sortable">HP</th>
            <th rowspan="3" data-sort="attack" class="sortable">攻撃力</th><th rowspan="3" data-sort="defense" class="sortable">防御力</th><th rowspan="3" data-sort="accuracy" class="sortable">照準値</th>
            <th rowspan="3" data-sort="mobility" class="sortable">運動性</th><th rowspan="3" data-sort="movement" class="sortable">移動</th><th rowspan="3" data-sort="speed" class="sortable">ｽﾋﾟｰﾄﾞ</th>
            <th rowspan="3" data-sort="specialAbilityName" class="sortable">特殊能力名</th><th rowspan="3" data-sort="specialAbilityEffect" class="sortable">特殊能力効果</th>
            <th rowspan="3" data-sort="terrainAir" class="sortable">空</th><th rowspan="3" data-sort="terrainLand" class="sortable">陸</th><th rowspan="3" data-sort="terrainSea" class="sortable">海</th><th rowspan="3" data-sort="terrainSpace" class="sortable">宇</th>
            <th colspan="6">通常攻撃</th><th rowspan="3" class="text-center">操作</th>
          </tr>
          <tr><th rowspan="2" data-sort="normalWeaponName" class="sortable">名前</th><th rowspan="2" data-sort="normalWeaponType" class="sortable">ﾀｲﾌﾟ</th><th colspan="2">射程</th><th rowspan="2" data-sort="normalWeaponAction" class="sortable">ｱｸｼｮﾝ</th><th rowspan="2" data-sort="normalWeaponUses" class="sortable">回数</th></tr>
          <tr><th data-sort="normalWeaponRangeMin" class="sortable">min</th><th data-sort="normalWeaponRangeMax" class="sortable">max</th></tr>
        </thead>
        <tbody>
          ${sortedUnits.map((u) => {
            const pilot = pilotById.get(String(u.pilotId));
            return `
            <tr>
              <td>${u.id || ''}</td><td>${u.name || ''}</td><td>${pilot?.name || ''}</td><td>${u.size || ''}</td><td>${u.type || ''}</td><td>${u.hp || 0}</td>
              <td>${u.attack || 0}</td><td>${u.defense || 0}</td><td>${u.accuracy || 0}</td><td>${u.mobility || 0}</td><td>${u.movement || 0}</td><td>${u.speed || 0}</td>
              <td>${u.specialAbility?.name || ''}</td><td>${u.specialAbility?.effect || ''}</td><td>${u.data?.terrain?.air || 'C'}</td><td>${u.data?.terrain?.land || 'C'}</td><td>${u.data?.terrain?.sea || 'C'}</td><td>${u.data?.terrain?.space || 'C'}</td>
              <td>${u.normalWeapon?.name || ''}</td><td>${u.normalWeapon?.type || ''}</td><td>${u.normalWeapon?.range?.min || 0}</td><td>${u.normalWeapon?.range?.max || 0}</td><td>${u.normalWeapon?.action || 0}</td><td>${u.normalWeapon?.uses || 0}</td>
              <td class="text-center">
                <button class="unit-edit btn btn-sm btn-outline-secondary" data-id="${u.id}" title="更新" aria-label="更新"><i class="bi bi-pencil"></i></button>
                <button class="unit-select-pilot btn btn-sm btn-outline-secondary" data-id="${u.id}" title="パイロット選択" aria-label="パイロット選択"><i class="bi bi-person"></i></button>
                <button class="unit-delete btn btn-sm btn-danger" data-id="${u.id}" title="削除" aria-label="削除"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `;
          }).join('')}
        </tbody>
      </table></div></div>
    </div>
  `;
}

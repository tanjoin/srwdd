export function renderPilotPage({ sortedPilots }) {
  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">パイロットデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="pilot-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-pilot" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th rowspan="2" data-sort="id" class="sortable">ID</th><th rowspan="2" data-sort="name" class="sortable">名前</th>
            <th colspan="4">基礎</th>
            <th colspan="4">基本スキル</th>
            <th colspan="4">特殊スキル</th>
            <th colspan="4">合計</th>
            <th rowspan="2" class="text-center">操作</th>
          </tr>
          <tr>
            <th data-sort="baseAttack" class="sortable">攻</th><th data-sort="baseDefense" class="sortable">防</th><th data-sort="baseAccuracy" class="sortable">照</th><th data-sort="baseMobility" class="sortable">運</th>
            <th data-sort="basicSkillAttack" class="sortable">攻</th><th data-sort="basicSkillDefense" class="sortable">防</th><th data-sort="basicSkillAccuracy" class="sortable">照</th><th data-sort="basicSkillMobility" class="sortable">運</th>
            <th data-sort="specialSkillAttack" class="sortable">攻</th><th data-sort="specialSkillDefense" class="sortable">防</th><th data-sort="specialSkillAccuracy" class="sortable">照</th><th data-sort="specialSkillMobility" class="sortable">運</th>
            <th data-sort="totalAttack" class="sortable">攻</th><th data-sort="totalDefense" class="sortable">防</th><th data-sort="totalAccuracy" class="sortable">照</th><th data-sort="totalMobility" class="sortable">運</th>
          </tr>
        </thead>
        <tbody>
          ${sortedPilots.map((p, i) => `
            <tr>
              <td>${p.id || ''}</td>
              <td>${p.name || ''}</td>
              <td>${p.baseAttack}</td><td>${p.baseDefense}</td><td>${p.baseAccuracy}</td><td>${p.baseMobility}</td>
              <td>${p.basicSkillAttack}</td><td>${p.basicSkillDefense}</td><td>${p.basicSkillAccuracy}</td><td>${p.basicSkillMobility}</td>
              <td>${p.specialSkillAttack}</td><td>${p.specialSkillDefense}</td><td>${p.specialSkillAccuracy}</td><td>${p.specialSkillMobility}</td>
              <td>${p.totalAttack}</td><td>${p.totalDefense}</td><td>${p.totalAccuracy}</td><td>${p.totalMobility}</td>
              <td class="text-center">
                <button class="pilot-equip btn btn-sm btn-outline-secondary" data-id="${p.id}" title="装備" aria-label="装備"><i class="bi bi-gear"></i></button>
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${i}" title="削除" aria-label="削除"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3"><h2 class="h6 mb-0">パイロット追加</h2></div>
      <div class="card-body">
      <form id="pilot-form" class="row g-3">
        <div class="col-12 col-md-3"><label class="form-label small">名前</label><input id="pilot-name" name="name" placeholder="名前" required class="form-control" /></div>
        <div class="col-12"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">基礎ステータス</div><div class="row g-2">
          <div class="col-6 col-md-3"><input name="baseAttack" type="number" placeholder="攻撃" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="baseDefense" type="number" placeholder="防御" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="baseAccuracy" type="number" placeholder="照準" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="baseMobility" type="number" placeholder="運動" class="form-control" /></div>
        </div></div></div>
        <div class="col-12"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">基本スキル</div><div class="row g-2">
          <div class="col-6 col-md-3"><input name="basicSkillAttack" type="number" placeholder="攻撃" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="basicSkillDefense" type="number" placeholder="防御" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="basicSkillAccuracy" type="number" placeholder="照準" class="form-control" /></div>
          <div class="col-6 col-md-3"><input name="basicSkillMobility" type="number" placeholder="運動" class="form-control" /></div>
        </div></div></div>
        <div class="col-12"><button type="submit" class="btn btn-primary">追加</button></div>
      </form>
      </div>
    </div>
  `;
}

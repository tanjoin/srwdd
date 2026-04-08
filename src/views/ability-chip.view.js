import { escapeHtml } from '../services/ui.service.js';

function valueAt(list, index) {
  return Array.isArray(list) ? (list[index] || '') : '';
}

export function renderAbilityChipSection({ sortedAbilityChips, editingAbilityChip, editingAbilityChipData }) {
  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">アビリティチップ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="ability-chip-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-ability-chip" class="btn btn-sm btn-primary"><i class="bi bi-download me-1"></i>CSVエクスポート</button>
          </div>
        </div>
      </div>
      <div class="card-body"><div class="table-responsive"><table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light"><tr>
          <th data-sort-target="abilityChip" data-sort="id" class="sortable">ID</th>
          <th data-sort-target="abilityChip" data-sort="name" class="sortable">名前</th>
          <th>ベース</th><th>EX</th><th>SP</th><th class="text-center">操作</th>
        </tr></thead>
        <tbody>
          ${sortedAbilityChips.map((chip) => `
            <tr>
              <td>${chip.id || ''}</td><td>${escapeHtml(chip.name || '')}</td>
              <td>${escapeHtml((chip.baseAbility || []).join(' / '))}</td>
              <td>${escapeHtml((chip.exAbility || []).join(' / '))}</td>
              <td>${escapeHtml((chip.spAbility || []).join(' / '))}</td>
              <td class="text-center">
                <button class="ability-chip-edit btn btn-sm btn-outline-secondary" data-id="${chip.id}" title="更新" aria-label="更新"><i class="bi bi-pencil"></i></button>
                <button class="ability-chip-delete btn btn-sm btn-danger" data-id="${chip.id}" title="削除" aria-label="削除"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table></div></div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3"><h2 class="h6 mb-0">${editingAbilityChip ? 'アビリティチップ更新' : 'アビリティチップ追加'}</h2></div>
      <div class="card-body">
        <form id="ability-chip-form" class="row g-3">
          <div class="col-12 col-md-4"><input name="chipName" placeholder="名前" required class="form-control" value="${escapeHtml(editingAbilityChipData.name || '')}" /></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">ベースアビリティ</div><div class="row g-2">
            <div class="col-12 col-md-4"><input name="baseAbility1" placeholder="1" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.baseAbility, 0))}" /></div>
            <div class="col-12 col-md-4"><input name="baseAbility2" placeholder="2" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.baseAbility, 1))}" /></div>
            <div class="col-12 col-md-4"><input name="baseAbility3" placeholder="3" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.baseAbility, 2))}" /></div>
          </div></div></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">EXアビリティ</div><div class="row g-2">
            <div class="col-12 col-md-6"><input name="exAbility1" placeholder="1" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.exAbility, 0))}" /></div>
            <div class="col-12 col-md-6"><input name="exAbility2" placeholder="2" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.exAbility, 1))}" /></div>
          </div></div></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">SPアビリティ</div><div class="row g-2">
            <div class="col-12"><input name="spAbility1" placeholder="1" class="form-control" value="${escapeHtml(valueAt(editingAbilityChipData.spAbility, 0))}" /></div>
          </div></div></div>
          <div class="col-12"><button type="submit" class="btn btn-primary">${editingAbilityChip ? '更新' : '追加'}</button>${editingAbilityChip ? '<button type="button" id="cancel-ability-chip-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}</div>
        </form>
      </div>
    </div>
  `;
}
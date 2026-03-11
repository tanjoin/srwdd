export function renderUnitModal({ currentView, selectedUnit, selectedUnitPilotId, pilots }) {
  if (currentView !== 'unit') return '';
  return `
    <div class="modal fade" id="unit-pilot-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h3 class="modal-title fs-6">パイロット選択</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button></div>
        <div class="modal-body">
          <label class="form-label small">${selectedUnit?.name || ''}</label>
          <select id="unit-pilot" class="form-select"><option value="">未設定</option>
            ${pilots.map(p => `<option value="${p.id}" ${String(p.id) === String(selectedUnitPilotId) ? 'selected' : ''}>${p.name || p.id}</option>`).join('')}
          </select>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button></div>
      </div></div>
    </div>
  `;
}
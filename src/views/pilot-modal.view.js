export function renderPilotModal({ currentView, pilots, selectedPilotId, equipSlots, equippedCount, equipCandidates, equippedSet }) {
  if (currentView !== 'pilot') return '';
  return `
    <div class="modal fade" id="equip-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content">
        <div class="modal-header"><h3 class="modal-title fs-6">スキル装備</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button></div>
        <div class="modal-body">
          <div class="row g-2 align-items-end mb-3">
            <div class="col-12 col-md-5"><label class="form-label small">パイロット</label><select id="equip-pilot" class="form-select">
              ${pilots.map(p => `<option value="${p.id}" ${String(p.id) === String(selectedPilotId) ? 'selected' : ''}>${p.name || p.id}</option>`).join('')}
            </select></div>
            <div class="col-6 col-md-3"><label class="form-label small">装備枠</label><input id="equip-slots" type="number" min="0" value="${equipSlots}" class="form-control" /></div>
            <div class="col-6 col-md-4 text-md-end"><span id="equip-count" class="badge text-bg-dark">${equippedCount}/${equipSlots}</span></div>
          </div>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
            ${equipCandidates.filter(({ eligible }) => eligible).map(({ skill }, idx) => {
              const skillId = skill?.id ?? '';
              const checked = equippedSet.has(String(skillId)) ? 'checked' : '';
              const label = skill?.name || '(名称未設定)';
              const inputId = `equip-skill-${skillId || idx}`;
              return `<div class="col equip-tile"><input class="btn-check equip-skill" type="checkbox" id="${inputId}" value="${skillId}" ${checked} /><label class="btn btn-outline-dark w-100 text-start" for="${inputId}">${label}</label></div>`;
            }).join('')}
          </div>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button></div>
      </div></div>
    </div>
  `;
}
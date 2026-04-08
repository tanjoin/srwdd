import { escapeHtml } from '../services/ui.service.js';
import { isFinisherSlotEligible, isMainSlotEligible, isPartCompatibleWithUnit, isSubSlotEligible } from '../services/unit-part-slot.service.js';

function renderOptionList(items, selectedId) {
  return items.map((item) => `<option value="${item.id}" ${String(item.id) === String(selectedId) ? 'selected' : ''}>${escapeHtml(item.name || item.id || '')}</option>`).join('');
}

export function renderUnitModal({ currentView, selectedUnit, selectedUnitPilotId, selectedUnitLoadout, pilots, unitPartsList, abilityChips }) {
  if (currentView !== 'unit') return '';
  const compatibleParts = unitPartsList.filter((part) => isPartCompatibleWithUnit(part, selectedUnit?.id, selectedUnitPilotId));
  const mainParts = compatibleParts.filter(isMainSlotEligible);
  const finisherParts = compatibleParts.filter(isFinisherSlotEligible);
  const subParts = compatibleParts.filter(isSubSlotEligible);
  return `
    <div class="modal fade" id="unit-pilot-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h3 class="modal-title fs-6">編成</h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button></div>
        <div class="modal-body">
          <label class="form-label small">${selectedUnit?.name || ''}</label>
          <div class="mb-3"><label class="form-label small">パイロット</label><select id="unit-pilot" class="form-select"><option value="">未設定</option>
            ${pilots.map(p => `<option value="${p.id}" ${String(p.id) === String(selectedUnitPilotId) ? 'selected' : ''}>${p.name || p.id}</option>`).join('')}
          </select></div>
          <div class="mb-3"><label class="form-label small">アビリティチップ</label><select id="unit-ability-chip" class="form-select"><option value="">未設定</option>${renderOptionList(abilityChips, selectedUnitLoadout?.abilityChipId)}</select></div>
          <div class="row g-2">
            <div class="col-12"><label class="form-label small">MAIN</label><select id="unit-main-part" class="form-select"><option value="">未設定</option>${renderOptionList(mainParts, selectedUnitLoadout?.mainPartId)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">必殺技1</label><select id="unit-finisher-part-1" class="form-select"><option value="">未設定</option>${renderOptionList(finisherParts, selectedUnitLoadout?.finisherPart1Id)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">必殺技2</label><select id="unit-finisher-part-2" class="form-select"><option value="">未設定</option>${renderOptionList(finisherParts, selectedUnitLoadout?.finisherPart2Id)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">SUB1</label><select id="unit-sub-part-1" class="form-select"><option value="">未設定</option>${renderOptionList(subParts, selectedUnitLoadout?.subPart1Id)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">SUB2</label><select id="unit-sub-part-2" class="form-select"><option value="">未設定</option>${renderOptionList(subParts, selectedUnitLoadout?.subPart2Id)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">SUB3</label><select id="unit-sub-part-3" class="form-select"><option value="">未設定</option>${renderOptionList(subParts, selectedUnitLoadout?.subPart3Id)}</select></div>
            <div class="col-12 col-md-6"><label class="form-label small">SUB4</label><select id="unit-sub-part-4" class="form-select"><option value="">未設定</option>${renderOptionList(subParts, selectedUnitLoadout?.subPart4Id)}</select></div>
          </div>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button></div>
      </div></div>
    </div>
  `;
}
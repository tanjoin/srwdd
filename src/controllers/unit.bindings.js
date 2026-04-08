export function bindUnitView({
  state,
  render,
  saveState,
  getCurrentView,
  getSelectedUnitId,
  setSelectedUnitId,
  setEditingUnitId,
  getEditingUnitPartId,
  setEditingUnitPartId,
  getEditingAbilityChipId,
  setEditingAbilityChipId,
  getUnitPilotOpen,
  setUnitPilotOpen,
  onUnitCsvImport,
  onUnitCsvExport,
  onUnitFormSubmit,
  onUnitPartCsvImport,
  onUnitPartCsvExport,
  onUnitPartFormSubmit,
  onAbilityChipCsvImport,
  onAbilityChipCsvExport,
  onAbilityChipFormSubmit,
}) {
  const unitCsv = document.getElementById('unit-csv');
  const exportUnit = document.getElementById('export-unit');
  const unitForm = document.getElementById('unit-form');
  const unitPartsCsv = document.getElementById('unit-parts-csv');
  const exportUnitParts = document.getElementById('export-unit-parts');
  const unitPartForm = document.getElementById('unit-part-form');
  const abilityChipCsv = document.getElementById('ability-chip-csv');
  const exportAbilityChip = document.getElementById('export-ability-chip');
  const abilityChipForm = document.getElementById('ability-chip-form');

  if (unitCsv) unitCsv.onchange = onUnitCsvImport;
  if (exportUnit) exportUnit.onclick = onUnitCsvExport;
  if (unitForm) unitForm.onsubmit = onUnitFormSubmit;
  if (unitPartsCsv) unitPartsCsv.onchange = onUnitPartCsvImport;
  if (exportUnitParts) exportUnitParts.onclick = onUnitPartCsvExport;
  if (unitPartForm) unitPartForm.onsubmit = onUnitPartFormSubmit;
  if (abilityChipCsv) abilityChipCsv.onchange = onAbilityChipCsvImport;
  if (exportAbilityChip) exportAbilityChip.onclick = onAbilityChipCsvExport;
  if (abilityChipForm) abilityChipForm.onsubmit = onAbilityChipFormSubmit;

  const partIsMap = document.getElementById('part-is-map');
  const partMapFields = document.getElementById('part-map-fields');
  const partRangeFields = document.getElementById('part-range-fields');
  const partIsSupport = document.getElementById('part-is-support');
  const partUnitId = document.getElementById('part-unit-id');
  const partPilotId = document.getElementById('part-pilot-id');
  const partCombatFields = document.getElementById('part-combat-fields');
  const partSpiritFields = document.getElementById('part-spirit-fields');
  if (partIsMap && partMapFields && partRangeFields) {
    const syncPartMapFields = () => {
      const enabled = partIsMap.checked;
      const supportEnabled = partIsSupport?.checked;
      partMapFields.classList.toggle('d-none', !enabled);
      partRangeFields.classList.toggle('d-none', enabled || supportEnabled);
    };
    partIsMap.onchange = syncPartMapFields;
    syncPartMapFields();
  }

  if (partIsSupport && partUnitId && partPilotId) {
    const syncSupportFields = () => {
      const enabled = !partIsSupport.checked;
      partUnitId.disabled = !enabled;
      partPilotId.disabled = !enabled;
      if (partCombatFields) {
        partCombatFields.classList.toggle('d-none', !enabled);
      }
      if (partSpiritFields) {
        partSpiritFields.classList.toggle('d-none', enabled);
      }
      if (!enabled) {
        partUnitId.value = '';
        partPilotId.value = '';
      }
      if (partRangeFields && partIsMap) {
        const mapEnabled = partIsMap.checked;
        partRangeFields.classList.toggle('d-none', mapEnabled || !enabled);
      }
    };
    partIsSupport.onchange = syncSupportFields;
    syncSupportFields();
  }

  document.querySelectorAll('.unit-edit').forEach(btn => {
    btn.onclick = () => {
      setEditingUnitId(btn.getAttribute('data-id'));
      render();
    };
  });

  document.querySelectorAll('.unit-part-edit').forEach(btn => {
    btn.onclick = () => {
      setEditingUnitPartId(btn.getAttribute('data-id'));
      render();
    };
  });

  document.querySelectorAll('.ability-chip-edit').forEach(btn => {
    btn.onclick = () => {
      setEditingAbilityChipId(btn.getAttribute('data-id'));
      render();
    };
  });

  const cancelUnitEditBtn = document.getElementById('cancel-unit-edit');
  if (cancelUnitEditBtn) {
    cancelUnitEditBtn.onclick = () => {
      setEditingUnitId(null);
      render();
    };
  }

  const cancelUnitPartEditBtn = document.getElementById('cancel-unit-part-edit');
  if (cancelUnitPartEditBtn) {
    cancelUnitPartEditBtn.onclick = () => {
      setEditingUnitPartId(null);
      render();
    };
  }

  const cancelAbilityChipEditBtn = document.getElementById('cancel-ability-chip-edit');
  if (cancelAbilityChipEditBtn) {
    cancelAbilityChipEditBtn.onclick = () => {
      setEditingAbilityChipId(null);
      render();
    };
  }

  document.querySelectorAll('.unit-select-pilot').forEach(btn => {
    btn.onclick = () => {
      setSelectedUnitId(btn.getAttribute('data-id'));
      setUnitPilotOpen(true);
      render();
    };
  });

  const unitPilotModalEl = document.getElementById('unit-pilot-modal');
  const unitPilotSelect = document.getElementById('unit-pilot');
  if (unitPilotModalEl && window.bootstrap) {
    const modal = window.bootstrap.Modal.getOrCreateInstance(unitPilotModalEl);
    if (getUnitPilotOpen()) modal.show();
    unitPilotModalEl.addEventListener('hidden.bs.modal', () => {
      setUnitPilotOpen(false);
      if (getCurrentView() === 'unit') render();
    });
  }

  if (unitPilotSelect) {
    unitPilotSelect.onchange = () => {
      const unit = state.units.find(u => String(u.id) === String(getSelectedUnitId()));
      if (!unit) return;
      unit.data = unit.data || {};
      unit.data.pilotId = unitPilotSelect.value || '';
      saveState();
      render();
    };
  }

  bindLoadoutSelect(state, 'unit-ability-chip', 'abilityChipId', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-main-part', 'mainPartId', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-finisher-part-1', 'finisherPart1Id', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-finisher-part-2', 'finisherPart2Id', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-sub-part-1', 'subPart1Id', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-sub-part-2', 'subPart2Id', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-sub-part-3', 'subPart3Id', getSelectedUnitId, saveState);
  bindLoadoutSelect(state, 'unit-sub-part-4', 'subPart4Id', getSelectedUnitId, saveState);
}

function bindLoadoutSelect(state, elementId, key, getSelectedUnitId, saveState) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.onchange = () => {
    const unit = state.units.find((item) => String(item.id) === String(getSelectedUnitId()));
    if (!unit) return;
    unit.data = unit.data || {};
    unit.data.loadout = unit.data.loadout || {};
    unit.data.loadout[key] = element.value || '';
    saveState();
  };
}

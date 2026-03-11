export function bindUnitView({
  state,
  render,
  saveState,
  getCurrentView,
  getSelectedUnitId,
  setSelectedUnitId,
  setEditingUnitId,
  getUnitPilotOpen,
  setUnitPilotOpen,
  onUnitCsvImport,
  onUnitCsvExport,
  onUnitFormSubmit,
}) {
  document.getElementById('unit-csv').onchange = onUnitCsvImport;
  document.getElementById('export-unit').onclick = onUnitCsvExport;
  document.getElementById('unit-form').onsubmit = onUnitFormSubmit;

  document.querySelectorAll('.unit-edit').forEach(btn => {
    btn.onclick = () => {
      setEditingUnitId(btn.getAttribute('data-id'));
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
      const modal = window.bootstrap?.Modal.getOrCreateInstance(unitPilotModalEl);
      setUnitPilotOpen(false);
      modal?.hide();
    };
  }
}

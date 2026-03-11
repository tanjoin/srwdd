export function bindPilotView({
  state,
  render,
  saveState,
  getSelectedPilotId,
  setSelectedPilotId,
  getEquipOpen,
  setEquipOpen,
  onPilotCsvImport,
  onPilotCsvExport,
  onPilotFormSubmit,
}) {
  document.getElementById('pilot-csv').onchange = onPilotCsvImport;
  document.getElementById('export-pilot').onclick = onPilotCsvExport;
  document.getElementById('pilot-form').onsubmit = onPilotFormSubmit;

  document.querySelectorAll('.pilot-equip').forEach(btn => {
    btn.onclick = () => {
      setSelectedPilotId(btn.getAttribute('data-id'));
      setEquipOpen(true);
      render();
    };
  });

  const equipPilotSelect = document.getElementById('equip-pilot');
  const equipSlotsInput = document.getElementById('equip-slots');
  const equipModalEl = document.getElementById('equip-modal');
  const equipCountBadge = document.getElementById('equip-count');

  if (equipModalEl && window.bootstrap) {
    const modal = window.bootstrap.Modal.getOrCreateInstance(equipModalEl);
    if (getEquipOpen()) modal.show();
    equipModalEl.addEventListener('hidden.bs.modal', () => {
      setEquipOpen(false);
    });
  }

  if (equipPilotSelect) {
    equipPilotSelect.onchange = () => {
      setSelectedPilotId(equipPilotSelect.value);
      render();
    };
  }

  if (equipSlotsInput) {
    equipSlotsInput.onchange = () => {
      const pilot = state.pilots.find(p => String(p.id) === String(getSelectedPilotId()));
      if (!pilot) return;
      pilot.data = pilot.data || {};
      const nextSlots = Number(equipSlotsInput.value) || 0;
      pilot.data.skillSlots = nextSlots;

      const checked = Array.from(document.querySelectorAll('.equip-skill:checked'));
      if (checked.length > nextSlots) checked.slice(nextSlots).forEach(cb => { cb.checked = false; });

      const current = new Set(Array.from(document.querySelectorAll('.equip-skill:checked')).map(cb => String(cb.value)));
      pilot.data.equippedSkillIds = Array.from(current);
      saveState();
      if (equipCountBadge) equipCountBadge.textContent = `${current.size}/${nextSlots}`;
    };
  }

  document.querySelectorAll('.equip-skill').forEach(cb => {
    cb.onchange = () => {
      const pilot = state.pilots.find(p => String(p.id) === String(getSelectedPilotId()));
      if (!pilot) return;
      const slots = Number(pilot.data?.skillSlots) || 0;
      const current = new Set(pilot.equippedSkillIds.map(String));
      const skillId = cb.value;
      if (cb.checked) {
        if (current.size >= slots) {
          cb.checked = false;
          return;
        }
        current.add(String(skillId));
      } else {
        current.delete(String(skillId));
      }
      pilot.data = pilot.data || {};
      pilot.data.equippedSkillIds = Array.from(current);
      saveState();
      if (equipCountBadge) equipCountBadge.textContent = `${current.size}/${slots}`;
    };
  });
}

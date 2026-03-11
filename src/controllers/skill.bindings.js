export function bindSkillView({
  render,
  getSkillFilterPilot,
  setSkillFilterPilot,
  setEditingSkillId,
  onSkillCsvImport,
  onSkillCsvExport,
  onSkillFormSubmit,
}) {
  const skillFilterPilotSelect = document.getElementById('skill-filter-pilot');
  if (skillFilterPilotSelect) {
    skillFilterPilotSelect.value = getSkillFilterPilot() || '';
    skillFilterPilotSelect.onchange = () => {
      setSkillFilterPilot(skillFilterPilotSelect.value || '');
      render();
    };
  }

  document.getElementById('skill-csv').onchange = onSkillCsvImport;
  document.getElementById('export-skill').onclick = onSkillCsvExport;
  document.getElementById('skill-form').onsubmit = onSkillFormSubmit;

  document.querySelectorAll('.skill-edit').forEach(btn => {
    btn.onclick = () => {
      setEditingSkillId(btn.getAttribute('data-id'));
      render();
    };
  });

  const cancelSkillEditBtn = document.getElementById('cancel-skill-edit');
  if (cancelSkillEditBtn) {
    cancelSkillEditBtn.onclick = () => {
      setEditingSkillId(null);
      render();
    };
  }
}

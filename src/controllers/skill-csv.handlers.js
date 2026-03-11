export function createSkillCsvHandlers({ Papa, Skill, state, render, saveState, onSkillImported }) {
  function handleSkillCSVImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.skills = results.data.map(row => new Skill({ data: row }));
        onSkillImported();
        saveState();
        render();
      }
    });
  }

  function handleSkillCSVExport() {
    const csv = Papa.unparse(state.skills.map(s => (s.data || s)));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skills.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    handleSkillCSVImport,
    handleSkillCSVExport,
  };
}
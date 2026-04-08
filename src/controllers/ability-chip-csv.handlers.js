export function createAbilityChipCsvHandlers({ Papa, state, render, saveState, buildAbilityChip, flattenAbilityChipForCSV }) {
  function handleAbilityChipCSVImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.abilityChips = results.data
          .filter((row) => Object.values(row || {}).some((value) => String(value || '').trim() !== ''))
          .map((row) => buildAbilityChip(row));
        saveState();
        render();
      },
    });
  }

  function handleAbilityChipCSVExport() {
    const csv = Papa.unparse(state.abilityChips.map((item) => flattenAbilityChipForCSV(item)));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ability-chips.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    handleAbilityChipCSVImport,
    handleAbilityChipCSVExport,
  };
}
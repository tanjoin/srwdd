export function createUnitCsvHandlers({ Papa, state, render, saveState, buildUnit, flattenUnitForCSV, onUnitImported }) {
  function handleUnitCSVImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.units = results.data.map(row => buildUnit(row));
        onUnitImported();
        saveState();
        render();
      }
    });
  }

  function handleUnitCSVExport() {
    const csv = Papa.unparse(state.units.map(u => flattenUnitForCSV(u)));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'units.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    handleUnitCSVImport,
    handleUnitCSVExport,
  };
}
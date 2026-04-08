export function createUnitPartCsvHandlers({ Papa, state, render, saveState, buildUnitPart, flattenUnitPartForCSV }) {
  function handleUnitPartCSVImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.unitPartsList = results.data
          .filter((row) => Object.values(row || {}).some((value) => String(value || '').trim() !== ''))
          .map((row) => buildUnitPart(row));
        saveState();
        render();
      },
    });
  }

  function handleUnitPartCSVExport() {
    const csv = Papa.unparse(state.unitPartsList.map((item) => flattenUnitPartForCSV(item)));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unit-parts.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    handleUnitPartCSVImport,
    handleUnitPartCSVExport,
  };
}
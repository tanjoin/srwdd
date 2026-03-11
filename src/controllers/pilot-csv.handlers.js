export function createPilotCsvHandlers({ Papa, state, render, saveState, buildPilot, parsePilotRow, flattenPilotForCSV }) {
  function handlePilotCSVImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.pilots = results.data.map(row => buildPilot(parsePilotRow(row), state.skills));
        saveState();
        render();
      }
    });
  }

  function handlePilotCSVExport() {
    const csv = Papa.unparse(state.pilots.map(p => flattenPilotForCSV(p.data || p)));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pilots.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    handlePilotCSVImport,
    handlePilotCSVExport,
  };
}
export function bindRankingView({ render, getSelectedMorale, setSelectedMorale }) {
  const moraleValueSelect = document.getElementById('ranking-morale-select');
  if (!moraleValueSelect) {
    return;
  }

  moraleValueSelect.value = String(getSelectedMorale?.() || 100);
  moraleValueSelect.onchange = () => {
    setSelectedMorale(moraleValueSelect.value || '100');
    render();
  };
}
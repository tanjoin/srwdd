export function bindSortHeaders({ sortState, getCurrentView, render }) {
  document.querySelectorAll('th.sortable').forEach(th => {
    th.style.cursor = 'pointer';
    th.onclick = () => {
      const key = th.getAttribute('data-sort');
      if (!key) return;
      const currentView = getCurrentView();
      const target = currentView === 'pilot'
        ? 'pilot'
        : (currentView === 'skill' ? 'skill' : (currentView === 'unit' ? 'unit' : 'ranking'));
      const current = sortState[target];
      if (current.key === key) {
        current.dir = current.dir === 'asc' ? 'desc' : 'asc';
      } else {
        current.key = key;
        current.dir = 'asc';
      }
      render();
    };
  });
}
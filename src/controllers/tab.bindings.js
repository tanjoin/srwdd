export function bindTabs({ setCurrentView, setViewQuery, setEquipOpen, render }) {
  const bind = (id, view) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.onclick = () => {
      setCurrentView(view);
      setViewQuery(view);
      setEquipOpen(false);
      render();
    };
  };

  bind('view-pilot', 'pilot');
  bind('view-skill', 'skill');
  bind('view-unit', 'unit');
  bind('view-ranking', 'ranking');
}
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
  bind('view-unit-part', 'unitPart');
  bind('view-ability-chip', 'abilityChip');
  bind('view-ranking', 'ranking');
  bind('view-optimizer', 'optimizer');
}
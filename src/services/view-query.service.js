function normalizeView(view) {
  return ['pilot', 'skill', 'unit', 'ranking'].includes(view) ? view : 'pilot';
}

export function getViewFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return normalizeView(params.get('view'));
}

export function setViewQuery(view) {
  const normalized = normalizeView(view);
  const url = new URL(window.location.href);
  url.searchParams.set('view', normalized);
  window.history.replaceState(null, '', url);
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function showToast(message) {
  const toastEl = document.getElementById('app-toast');
  const messageEl = document.getElementById('app-toast-message');
  if (!toastEl || !messageEl) return;
  messageEl.textContent = message;
  if (window.bootstrap?.Toast) {
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1800 });
    toast.show();
  }
}

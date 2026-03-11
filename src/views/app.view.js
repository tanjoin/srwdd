import { renderPilotPage } from './pilot-page.view.js';
import { renderSkillPage } from './skill-page.view.js';
import { renderUnitPage } from './unit-page.view.js';
import { renderRankingPage } from './ranking-page.view.js';
import { renderPilotModal, renderUnitModal } from './modals.view.js';

function renderCurrentPage(vm) {
  if (vm.currentView === 'pilot') return renderPilotPage(vm);
  if (vm.currentView === 'skill') return renderSkillPage(vm);
  if (vm.currentView === 'unit') return renderUnitPage(vm);
  if (vm.currentView === 'ranking') return renderRankingPage(vm);
  return '';
}

function renderToast() {
  return `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="app-toast" class="toast align-items-center text-bg-dark border-0" role="status" aria-live="polite" aria-atomic="true">
        <div class="d-flex">
          <div id="app-toast-message" class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="閉じる"></button>
        </div>
      </div>
    </div>
  `;
}

export function buildAppHtml(vm) {
  return `
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item"><button id="view-pilot" class="nav-link ${vm.currentView === 'pilot' ? 'active' : ''}" type="button">パイロット</button></li>
            <li class="nav-item"><button id="view-skill" class="nav-link ${vm.currentView === 'skill' ? 'active' : ''}" type="button">スキル</button></li>
            <li class="nav-item"><button id="view-unit" class="nav-link ${vm.currentView === 'unit' ? 'active' : ''}" type="button">機体</button></li>
            <li class="nav-item"><button id="view-ranking" class="nav-link ${vm.currentView === 'ranking' ? 'active' : ''}" type="button">ランキング</button></li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
        ${renderCurrentPage(vm)}
        ${renderPilotModal(vm)}
        ${renderUnitModal(vm)}
      </div>
    </div>
    ${renderToast()}
  `;
}

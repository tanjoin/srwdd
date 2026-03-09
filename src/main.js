import Pilot from './model/pilot.model.js';
import Skill from './model/skill.model.js';
import Papa from 'papaparse';

const app = document.getElementById('app');

// localStorageからデータを読み込む
function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem('srwdd-state'));
    if (data && Array.isArray(data.pilots)) {
      return {
        pilots: data.pilots,
        skills: Array.isArray(data.skills) ? data.skills : [],
      };
    }
  } catch (e) {}
  return { pilots: [], skills: [] };
}

function saveState() {
  localStorage.setItem('srwdd-state', JSON.stringify({
    pilots: state.pilots.map(p => p.data || p),
    skills: state.skills.map(s => s.data || s),
  }));
}

let state = loadState();
let currentView = 'pilot';
let selectedPilotId = null;
let equipOpen = false;
let sortState = {
  pilot: { key: 'id', dir: 'asc' },
  skill: { key: 'id', dir: 'asc' },
};

function buildPilot(row) {
  return new Pilot({ data: row }, state.skills);
}

function render() {
  const pilots = state.pilots.map(p => (p instanceof Pilot ? p : buildPilot(p)));
  const skills = state.skills.map(s => (s instanceof Skill ? s : new Skill({ data: s })));
  state.pilots = pilots;
  state.skills = skills;
  // スキル参照を最新に更新
  state.pilots.forEach(p => {
    p.skillList = state.skills;
  });

  if (!selectedPilotId && pilots.length > 0) {
    selectedPilotId = String(pilots[0].id);
  }
  const selectedPilot = pilots.find(p => String(p.id) === String(selectedPilotId));
  const equippedIds = selectedPilot?.equippedSkillIds || [];
  const equippedSet = new Set(equippedIds.map(String));
  const pilotNameForEquip = selectedPilot?.name || '';
  const equipCandidates = skills.map(s => {
    const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
    const eligible = pilotNameForEquip && names.some(n => n.includes(pilotNameForEquip));
    return { skill: s, eligible };
  });
  const equipSlots = Number(selectedPilot?.data?.skillSlots) || 0;
  const equippedCount = equippedIds.length;

  const pilotSort = sortState.pilot;
  const skillSort = sortState.skill;
  const sortedPilots = [...pilots].sort((a, b) => compareValues(a, b, pilotSort.key, pilotSort.dir));
  const sortedSkills = [...skills].sort((a, b) => compareValues(a, b, skillSort.key, skillSort.dir));

  app.innerHTML = `
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item">
              <button id="view-pilot" class="nav-link ${currentView === 'pilot' ? 'active' : ''}" type="button">パイロット</button>
            </li>
            <li class="nav-item">
              <button id="view-skill" class="nav-link ${currentView === 'skill' ? 'active' : ''}" type="button">スキル</button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
    ${currentView === 'pilot' ? `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">パイロットデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="pilot-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-pilot" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th rowspan="2" data-sort="id" class="sortable">ID</th><th rowspan="2" data-sort="name" class="sortable">名前</th>
            <th colspan="4">基礎</th>
            <th colspan="4">基本スキル</th>
            <th colspan="4">特殊スキル</th>
            <th colspan="4">合計</th>
            <th rowspan="2" class="text-center">操作</th>
          </tr>
          <tr>
            <th data-sort="baseAttack" class="sortable">攻</th><th data-sort="baseDefense" class="sortable">防</th><th data-sort="baseAccuracy" class="sortable">照</th><th data-sort="baseMobility" class="sortable">運</th>
            <th data-sort="basicSkillAttack" class="sortable">攻</th><th data-sort="basicSkillDefense" class="sortable">防</th><th data-sort="basicSkillAccuracy" class="sortable">照</th><th data-sort="basicSkillMobility" class="sortable">運</th>
            <th data-sort="specialSkillAttack" class="sortable">攻</th><th data-sort="specialSkillDefense" class="sortable">防</th><th data-sort="specialSkillAccuracy" class="sortable">照</th><th data-sort="specialSkillMobility" class="sortable">運</th>
            <th data-sort="totalAttack" class="sortable">攻</th><th data-sort="totalDefense" class="sortable">防</th><th data-sort="totalAccuracy" class="sortable">照</th><th data-sort="totalMobility" class="sortable">運</th>
          </tr>
        </thead>
        <tbody>
          ${sortedPilots.map((p, i) => `
            <tr>
              <td>${p.id || ''}</td>
              <td>${p.name || ''}</td>
              <td>${p.baseAttack}</td><td>${p.baseDefense}</td><td>${p.baseAccuracy}</td><td>${p.baseMobility}</td>
              <td>${p.basicSkillAttack}</td><td>${p.basicSkillDefense}</td><td>${p.basicSkillAccuracy}</td><td>${p.basicSkillMobility}</td>
              <td>${p.specialSkillAttack}</td><td>${p.specialSkillDefense}</td><td>${p.specialSkillAccuracy}</td><td>${p.specialSkillMobility}</td>
              <td>${p.totalAttack}</td><td>${p.totalDefense}</td><td>${p.totalAccuracy}</td><td>${p.totalMobility}</td>
              <td class="text-center">
                <button class="pilot-equip btn btn-sm btn-outline-secondary" data-id="${p.id}" title="装備" aria-label="装備">
                  <i class="bi bi-gear"></i>
                </button>
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${i}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">パイロット追加</h2>
      </div>
      <div class="card-body">
      <form id="pilot-form" class="row g-3">
        <div class="col-12 col-md-3">
          <label class="form-label small">名前</label>
          <input id="pilot-name" name="name" placeholder="名前" required class="form-control" />
        </div>
        <div class="col-12">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">基礎ステータス</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="baseAttack" type="number" placeholder="攻撃" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseDefense" type="number" placeholder="防御" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseAccuracy" type="number" placeholder="照準" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseMobility" type="number" placeholder="運動" class="form-control" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">基本スキル</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="basicSkillAttack" type="number" placeholder="攻撃" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillDefense" type="number" placeholder="防御" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillAccuracy" type="number" placeholder="照準" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillMobility" type="number" placeholder="運動" class="form-control" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">追加</button>
        </div>
      </form>
      </div>
    </div>
    ` : `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">スキルデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="skill-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-skill" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th data-sort="id" class="sortable">ID</th>
            <th data-sort="name" class="sortable">名前</th>
            <th data-sort="pilotNames" class="sortable">対応パイロット</th>
            <th data-sort="effect" class="sortable">効果</th>
            <th data-sort="attack" class="sortable">攻撃</th>
            <th data-sort="defense" class="sortable">防御</th>
            <th data-sort="accuracy" class="sortable">照準</th>
            <th data-sort="mobility" class="sortable">運動</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          ${sortedSkills.map((s, i) => `
            <tr>
              <td>${s.id || ''}</td>
              <td>${s.name || ''}</td>
              <td>${s.pilotNames?.join(', ') || ''}</td>
              <td>${s.effect || ''}</td>
              <td>${s.attack || 0}</td>
              <td>${s.defense || 0}</td>
              <td>${s.accuracy || 0}</td>
              <td>${s.mobility || 0}</td>
              <td class="text-center">
                <button class="skill-delete btn btn-sm btn-danger" data-index="${i}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">スキル追加</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">追加</button>
        </div>
      </form>
      </div>
    </div>
    `}
    ${currentView === 'pilot' ? `
    <div class="modal fade" id="equip-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-6">スキル装備</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
          </div>
          <div class="modal-body">
            <div class="row g-2 align-items-end mb-3">
              <div class="col-12 col-md-5">
                <label class="form-label small">パイロット</label>
                <select id="equip-pilot" class="form-select">
                  ${pilots.map(p => `<option value="${p.id}" ${String(p.id) === String(selectedPilotId) ? 'selected' : ''}>${p.name || p.id}</option>`).join('')}
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small">装備枠</label>
                <input id="equip-slots" type="number" min="0" value="${equipSlots}" class="form-control" />
              </div>
              <div class="col-6 col-md-4 text-md-end">
                <span id="equip-count" class="badge text-bg-dark">${equippedCount}/${equipSlots}</span>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
              ${equipCandidates.map(({ skill, eligible }, idx) => {
                const skillId = skill?.id ?? '';
                const checked = equippedSet.has(String(skillId)) ? 'checked' : '';
                const disabled = eligible ? '' : 'disabled';
                const label = skill?.name || '(名称未設定)';
                const opacity = eligible ? '' : 'opacity-50';
                const inputId = `equip-skill-${skillId || idx}`;
                return `<div class="col equip-tile ${opacity}">
                  <input class="btn-check equip-skill" type="checkbox" id="${inputId}" value="${skillId}" ${checked} ${disabled} />
                  <label class="btn btn-outline-dark w-100 text-start" for="${inputId}">${label}</label>
                </div>`;
              }).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    ` : ''}
      </div>
    </div>
  `;

  document.getElementById('view-pilot').onclick = () => {
    currentView = 'pilot';
    equipOpen = false;
    render();
  };
  document.getElementById('view-skill').onclick = () => {
    currentView = 'skill';
    equipOpen = false;
    render();
  };

  if (currentView === 'pilot') {
    document.getElementById('pilot-csv').onchange = handlePilotCSVImport;
    document.getElementById('export-pilot').onclick = handlePilotCSVExport;
    document.getElementById('pilot-form').onsubmit = handlePilotFormSubmit;
    document.querySelectorAll('.pilot-equip').forEach(btn => {
      btn.onclick = () => {
        selectedPilotId = btn.getAttribute('data-id');
        equipOpen = true;
        render();
      };
    });
    const equipPilotSelect = document.getElementById('equip-pilot');
    const equipSlotsInput = document.getElementById('equip-slots');
    const equipModalEl = document.getElementById('equip-modal');
    const equipCountBadge = document.getElementById('equip-count');
    if (equipModalEl && window.bootstrap) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(equipModalEl);
      if (equipOpen) {
        modal.show();
      }
      equipModalEl.addEventListener('hidden.bs.modal', () => {
        equipOpen = false;
      });
    }
    if (equipPilotSelect) {
      equipPilotSelect.onchange = () => {
        selectedPilotId = equipPilotSelect.value;
        render();
      };
    }
    if (equipSlotsInput) {
      equipSlotsInput.onchange = () => {
        const pilot = state.pilots.find(p => String(p.id) === String(selectedPilotId));
        if (!pilot) return;
        pilot.data = pilot.data || {};
        const nextSlots = Number(equipSlotsInput.value) || 0;
        pilot.data.skillSlots = nextSlots;

        const checked = Array.from(document.querySelectorAll('.equip-skill:checked'));
        if (checked.length > nextSlots) {
          const toUncheck = checked.slice(nextSlots);
          toUncheck.forEach(cb => {
            cb.checked = false;
          });
        }

        const current = new Set(
          Array.from(document.querySelectorAll('.equip-skill:checked')).map(cb => String(cb.value))
        );
        pilot.data.equippedSkillIds = Array.from(current);
        saveState();
        if (equipCountBadge) {
          equipCountBadge.textContent = `${current.size}/${nextSlots}`;
        }
      };
    }
    document.querySelectorAll('.equip-skill').forEach(cb => {
      cb.onchange = () => {
        const pilot = state.pilots.find(p => String(p.id) === String(selectedPilotId));
        if (!pilot) return;
        const slots = Number(pilot.data?.skillSlots) || 0;
        const current = new Set(pilot.equippedSkillIds.map(String));
        const skillId = cb.value;
        if (cb.checked) {
          if (current.size >= slots) {
            cb.checked = false;
            return;
          }
          current.add(String(skillId));
        } else {
          current.delete(String(skillId));
        }
        pilot.data = pilot.data || {};
        pilot.data.equippedSkillIds = Array.from(current);
        saveState();
        if (equipCountBadge) {
          equipCountBadge.textContent = `${current.size}/${slots}`;
        }
      };
    });
  } else {
    document.getElementById('skill-csv').onchange = handleSkillCSVImport;
    document.getElementById('export-skill').onclick = handleSkillCSVExport;
    document.getElementById('skill-form').onsubmit = handleSkillFormSubmit;
  }

  document.querySelectorAll('th.sortable').forEach(th => {
    th.style.cursor = 'pointer';
    th.onclick = () => {
      const key = th.getAttribute('data-sort');
      if (!key) return;
      const target = currentView === 'pilot' ? 'pilot' : 'skill';
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

  if (currentView === 'pilot') {
    document.querySelectorAll('.pilot-delete').forEach(btn => {
      btn.onclick = () => {
        const idx = Number(btn.getAttribute('data-index'));
        if (!isNaN(idx)) {
          state.pilots.splice(idx, 1);
          saveState();
          render();
        }
      };
    });
  } else {
    document.querySelectorAll('.skill-delete').forEach(btn => {
      btn.onclick = () => {
        const idx = Number(btn.getAttribute('data-index'));
        if (!isNaN(idx)) {
          state.skills.splice(idx, 1);
          saveState();
          render();
        }
      };
    });
  }
}

function compareValues(a, b, key, dir) {
  const av = normalizeSortValue(a, key);
  const bv = normalizeSortValue(b, key);
  if (av < bv) return dir === 'asc' ? -1 : 1;
  if (av > bv) return dir === 'asc' ? 1 : -1;
  return 0;
}

function normalizeSortValue(obj, key) {
  const value = obj?.[key];
  if (Array.isArray(value)) return value.join(',');
  if (value === undefined || value === null) return '';
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== '') return num;
  return String(value).toLowerCase();
}

function handlePilotCSVImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      state.pilots = results.data.map(row => buildPilot(parsePilotRow(row)));
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

function flattenPilotForCSV(p) {
  return {
    id: p.id || '',
    name: p.name || '',
    baseAttack: p.status?.base?.attack ?? 0,
    baseDefense: p.status?.base?.defense ?? 0,
    baseAccuracy: p.status?.base?.accuracy ?? 0,
    baseMobility: p.status?.base?.mobility ?? 0,
    basicSkillAttack: p.status?.basicSkill?.attack ?? 0,
    basicSkillDefense: p.status?.basicSkill?.defense ?? 0,
    basicSkillAccuracy: p.status?.basicSkill?.accuracy ?? 0,
    basicSkillMobility: p.status?.basicSkill?.mobility ?? 0,
    skillSlots: p.skillSlots ?? 0,
    equippedSkillIds: Array.isArray(p.equippedSkillIds)
      ? p.equippedSkillIds.join(',')
      : (p.equippedSkillIds || ''),
  };
}

function parsePilotRow(row) {
  const status = {
    base: {
      attack: Number(row.baseAttack || row.attack || 0),
      defense: Number(row.baseDefense || row.defense || 0),
      accuracy: Number(row.baseAccuracy || row.accuracy || 0),
      mobility: Number(row.baseMobility || row.mobility || 0),
    },
    basicSkill: {
      attack: Number(row.basicSkillAttack || 0),
      defense: Number(row.basicSkillDefense || 0),
      accuracy: Number(row.basicSkillAccuracy || 0),
      mobility: Number(row.basicSkillMobility || 0),
    }
  };
  return {
    id: row.id || '',
    name: row.name || '',
    status,
    skillSlots: Number(row.skillSlots || 0),
    equippedSkillIds: typeof row.equippedSkillIds === 'string'
      ? row.equippedSkillIds.split(',').map(s => s.trim()).filter(Boolean)
      : [],
  };
}

function handleSkillCSVImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      state.skills = results.data.map(row => new Skill({ data: row }));
      saveState();
      render();
    }
  });
}

function handleSkillCSVExport() {
  const csv = Papa.unparse(state.skills.map(s => (s.data || s)));
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'skills.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function handlePilotFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const name = formData.get('name') || '';

  const status = {
    base: {
      attack: Number(formData.get('baseAttack')) || 0,
      defense: Number(formData.get('baseDefense')) || 0,
      accuracy: Number(formData.get('baseAccuracy')) || 0,
      mobility: Number(formData.get('baseMobility')) || 0,
    },
    basicSkill: {
      attack: Number(formData.get('basicSkillAttack')) || 0,
      defense: Number(formData.get('basicSkillDefense')) || 0,
      accuracy: Number(formData.get('basicSkillAccuracy')) || 0,
      mobility: Number(formData.get('basicSkillMobility')) || 0,
    }
  };

  const maxId = state.pilots.reduce((max, p) => {
    const idNum = Number(p.id || p.data?.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = { id: String(maxId + 1), name, status, skillSlots: 0, equippedSkillIds: [] };
  state.pilots.push(buildPilot(data));
  form.reset();
  saveState();
  render();
}

function handleSkillFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const name = formData.get('name') || '';
  const pilotNames = formData.get('pilotNames') || '';
  const effect = formData.get('effect') || '';
  const maxId = state.skills.reduce((max, s) => {
    const idNum = Number(s.id || s.data?.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);
  const data = {
    id: String(maxId + 1),
    name,
    pilotNames,
    effect,
    attack: Number(formData.get('attack')) || 0,
    defense: Number(formData.get('defense')) || 0,
    accuracy: Number(formData.get('accuracy')) || 0,
    mobility: Number(formData.get('mobility')) || 0,
  };
  state.skills.push(new Skill({ data }));
  form.reset();
  saveState();
  render();
}

render();

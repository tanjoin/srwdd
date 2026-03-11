import Pilot from './model/pilot.model.js';
import Skill from './model/skill.model.js';
import Unit from './model/unit.model.js';
import Papa from 'papaparse';

const app = document.getElementById('app');

// localStorageからデータを読み込む
function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem('srwdd-state'));
    if (data) {
      return {
        pilots: Array.isArray(data.pilots) ? data.pilots : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        units: Array.isArray(data.units) ? data.units : [],
      };
    }
  } catch (e) {}
  return { pilots: [], skills: [], units: [] };
}

function saveState() {
  localStorage.setItem('srwdd-state', JSON.stringify({
    pilots: state.pilots.map(p => p.data || p),
    skills: state.skills.map(s => s.data || s),
    units: state.units.map(u => u.data || u),
  }));
}

function normalizeView(view) {
  return ['pilot', 'skill', 'unit', 'ranking'].includes(view) ? view : 'pilot';
}

function getViewFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return normalizeView(params.get('view'));
}

function setViewQuery(view) {
  const normalized = normalizeView(view);
  const url = new URL(window.location.href);
  url.searchParams.set('view', normalized);
  window.history.replaceState(null, '', url);
}

let state = loadState();
let currentView = getViewFromQuery();
let selectedPilotId = null;
let selectedUnitId = null;
let editingSkillId = null;
let editingUnitId = null;
let skillFilterPilot = '';
let equipOpen = false;
let unitPilotOpen = false;
let sortState = {
  pilot: { key: 'id', dir: 'asc' },
  skill: { key: 'id', dir: 'asc' },
  unit: { key: 'id', dir: 'asc' },
  ranking: { key: 'score', dir: 'desc' },
};

function buildPilot(row) {
  return new Pilot({ data: row }, state.skills);
}

function buildUnit(row) {
  return new Unit({ data: parseUnitRow(row) });
}

function parseActionUses(value) {
  const raw = String(value ?? '').trim();
  if (raw === '') return '';
  if (raw === '-') return '-';
  const num = Number(raw);
  return Number.isNaN(num) ? raw : num;
}

function render() {
  const pilots = state.pilots.map(p => (p instanceof Pilot ? p : buildPilot(p)));
  const skills = state.skills.map(s => (s instanceof Skill ? s : new Skill({ data: s })));
  const units = state.units.map(u => (u instanceof Unit ? u : buildUnit(u)));
  state.pilots = pilots;
  state.skills = skills;
  state.units = units;
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
  const unitSort = sortState.unit;
  const sortedPilots = [...pilots].sort((a, b) => compareValues(a, b, pilotSort.key, pilotSort.dir));
  const sortedSkills = [...skills].sort((a, b) => compareValues(a, b, skillSort.key, skillSort.dir));
  const sortedUnits = [...units].sort((a, b) => compareValues(a, b, unitSort.key, unitSort.dir));
  const filteredSkills = sortedSkills.filter(s => {
    if (!skillFilterPilot) return true;
    const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
    return names.some(name => String(name).includes(skillFilterPilot));
  });
  const pilotById = new Map(pilots.map(p => [String(p.id), p]));
  const rankingSort = sortState.ranking;
  const rankingRows = units
    .map(u => {
      const pilot = pilotById.get(String(u.pilotId));
      if (!pilot) return null;
      const attack = (Number(u.attack) || 0) + (Number(pilot.totalAttack) || 0);
      const defense = (Number(u.defense) || 0) + (Number(pilot.totalDefense) || 0);
      const accuracy = (Number(u.accuracy) || 0) + (Number(pilot.totalAccuracy) || 0);
      const mobility = (Number(u.mobility) || 0) + (Number(pilot.totalMobility) || 0);
      const baseHp = Number(u.data?.baseHp ?? u.baseHp ?? u.hp) || 0;
      const partsIncreaseHp = Number(u.data?.partsIncreaseHp ?? u.partsIncreaseHp ?? 0) || 0;
      const combatPower = Math.round(
        (baseHp / 9) +
        (partsIncreaseHp * (2 / 3)) +
        attack +
        defense +
        (accuracy * 10) +
        (mobility * 10)
      );
      return {
        unitId: String(u.id || ''),
        unitName: u.name || '',
        pilotName: pilot.name || '',
        hp: Number(u.hp) || 0,
        baseHp,
        partsIncreaseHp,
        movement: Number(u.movement) || 0,
        speed: Number(u.speed) || 0,
        attack,
        defense,
        accuracy,
        mobility,
        total: attack + defense + accuracy + mobility,
        combatPower,
      };
    })
    .filter(Boolean);

  const rankingWeights = {
    hp: 0.15,
    attack: 0.22,
    defense: 0.22,
    accuracy: 0.18,
    mobility: 0.18,
    movement: 0.025,
    speed: 0.025,
  };
  const rankingFields = Object.keys(rankingWeights);
  const rankingFieldMax = rankingFields.reduce((acc, field) => {
    const maxValue = Math.max(...rankingRows.map(row => Number(row[field]) || 0), 0);
    acc[field] = maxValue > 0 ? maxValue : 1;
    return acc;
  }, {});
  const scoredRankingRows = rankingRows
    .map(row => {
      const score = rankingFields.reduce((sum, field) => {
        const normalized = (Number(row[field]) || 0) / rankingFieldMax[field];
        return sum + (normalized * rankingWeights[field]);
      }, 0);
      return {
        ...row,
        score: Number((score * 100).toFixed(2)),
      };
    })
    .sort((a, b) => compareValues(a, b, rankingSort.key, rankingSort.dir));
  const selectedUnit = units.find(u => String(u.id) === String(selectedUnitId));
  const selectedUnitPilotId = selectedUnit?.pilotId || '';
  const editingUnit = currentView === 'unit'
    ? units.find(u => String(u.id) === String(editingUnitId))
    : null;
  const editingUnitData = editingUnit?.data || {};
  const editingUnitTerrain = editingUnitData.terrain || {};
  const editingUnitSpecial = editingUnitData.specialAbility || {};
  const editingUnitWeapon = editingUnitData.normalWeapon || {};
  const editingUnitRange = editingUnitWeapon.range || {};
  const editingSkill = currentView === 'skill'
    ? skills.find(s => String(s.id) === String(editingSkillId))
    : null;
  const editingSkillData = editingSkill?.data || {};
  const editingPilotNamesValue = Array.isArray(editingSkillData.pilotNames)
    ? editingSkillData.pilotNames.join(', ')
    : (editingSkillData.pilotNames || '');

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
            <li class="nav-item">
              <button id="view-unit" class="nav-link ${currentView === 'unit' ? 'active' : ''}" type="button">機体</button>
            </li>
            <li class="nav-item">
              <button id="view-ranking" class="nav-link ${currentView === 'ranking' ? 'active' : ''}" type="button">ランキング</button>
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
    ` : currentView === 'skill' ? `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">スキルデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <select id="skill-filter-pilot" class="form-select form-select-sm">
              <option value="">全パイロット</option>
              ${Array.from(new Set(pilots.map(p => p.name).filter(Boolean))).map(name => `<option value="${escapeHtml(name)}" ${skillFilterPilot === name ? 'selected' : ''}>${name}</option>`).join('')}
            </select>
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
          ${filteredSkills.map((s) => `
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
                <button class="skill-edit btn btn-sm btn-outline-secondary" data-id="${s.id}" title="更新" aria-label="更新">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="skill-delete btn btn-sm btn-danger" data-id="${s.id}" title="削除" aria-label="削除">
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
        <h2 class="h6 mb-0">${editingSkill ? 'スキル更新' : 'スキル追加'}</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${escapeHtml(editingSkillData.name || '')}" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" list="pilot-name-list" autocomplete="off" value="${escapeHtml(editingPilotNamesValue)}" />
          <datalist id="pilot-name-list">
            ${pilots.map(p => `<option value="${p.name}">`).join('')}
          </datalist>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" value="${escapeHtml(editingSkillData.effect || '')}" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${editingSkillData.attack ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${editingSkillData.defense ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${editingSkillData.accuracy ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${editingSkillData.mobility ?? ''}" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${editingSkill ? '更新' : '追加'}</button>
          ${editingSkill ? '<button type="button" id="cancel-skill-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}
        </div>
      </form>
      </div>
    </div>
    ` : currentView === 'unit' ? `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">機体データ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="unit-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-unit" class="btn btn-sm btn-primary">
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
            <th rowspan="3" data-sort="id" class="sortable">ID</th>
            <th rowspan="3" data-sort="name" class="sortable">名前</th>
            <th rowspan="3" data-sort="pilotId" class="sortable">パイロット</th>
            <th rowspan="3" data-sort="size" class="sortable">サイズ</th>
            <th rowspan="3" data-sort="type" class="sortable">タイプ</th>
            <th rowspan="3" data-sort="hp" class="sortable">HP</th>
            <th rowspan="3" data-sort="attack" class="sortable">攻撃力</th>
            <th rowspan="3" data-sort="defense" class="sortable">防御力</th>
            <th rowspan="3" data-sort="accuracy" class="sortable">照準値</th>
            <th rowspan="3" data-sort="mobility" class="sortable">運動性</th>
            <th rowspan="3" data-sort="movement" class="sortable">移動</th>
            <th rowspan="3" data-sort="speed" class="sortable">ｽﾋﾟｰﾄﾞ</th>
            <th rowspan="3" data-sort="specialAbilityName" class="sortable">特殊能力名</th>
            <th rowspan="3" data-sort="specialAbilityEffect" class="sortable">特殊能力効果</th>
            <th rowspan="3" data-sort="terrainAir" class="sortable">空</th>
            <th rowspan="3" data-sort="terrainLand" class="sortable">陸</th>
            <th rowspan="3" data-sort="terrainSea" class="sortable">海</th>
            <th rowspan="3" data-sort="terrainSpace" class="sortable">宇</th>
            <th colspan="6">通常攻撃</th>
            <th rowspan="3" class="text-center">操作</th>
          </tr>
          <tr>
            <th rowspan="2" data-sort="normalWeaponName" class="sortable">名前</th>
            <th rowspan="2" data-sort="normalWeaponType" class="sortable">ﾀｲﾌﾟ</th>
            <th colspan="2">射程</th>
            <th rowspan="2" data-sort="normalWeaponAction" class="sortable">ｱｸｼｮﾝ</th>
            <th rowspan="2" data-sort="normalWeaponUses" class="sortable">回数</th>
          </tr>
          <tr>
            <th data-sort="normalWeaponRangeMin" class="sortable">min</th>
            <th data-sort="normalWeaponRangeMax" class="sortable">max</th>
          </tr>
        </thead>
        <tbody>
          ${sortedUnits.map((u) => {
            const pilot = pilotById.get(String(u.pilotId));
            return `
            <tr>
              <td>${u.id || ''}</td>
              <td>${u.name || ''}</td>
              <td>${pilot?.name || ''}</td>
              <td>${u.size || ''}</td>
              <td>${u.type || ''}</td>
              <td>${u.hp || 0}</td>
              <td>${u.attack || 0}</td>
              <td>${u.defense || 0}</td>
              <td>${u.accuracy || 0}</td>
              <td>${u.mobility || 0}</td>
              <td>${u.movement || 0}</td>
              <td>${u.speed || 0}</td>
              <td>${u.specialAbility?.name || ''}</td>
              <td>${u.specialAbility?.effect || ''}</td>
              <td>${u.data?.terrain?.air || 'C'}</td>
              <td>${u.data?.terrain?.land || 'C'}</td>
              <td>${u.data?.terrain?.sea || 'C'}</td>
              <td>${u.data?.terrain?.space || 'C'}</td>
              <td>${u.normalWeapon?.name || ''}</td>
              <td>${u.normalWeapon?.type || ''}</td>
              <td>${u.normalWeapon?.range?.min || 0}</td>
              <td>${u.normalWeapon?.range?.max || 0}</td>
              <td>${u.normalWeapon?.action || 0}</td>
              <td>${u.normalWeapon?.uses || 0}</td>
              <td class="text-center">
                <button class="unit-edit btn btn-sm btn-outline-secondary" data-id="${u.id}" title="更新" aria-label="更新">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="unit-select-pilot btn btn-sm btn-outline-secondary" data-id="${u.id}" title="パイロット選択" aria-label="パイロット選択">
                  <i class="bi bi-person"></i>
                </button>
                <button class="unit-delete btn btn-sm btn-danger" data-id="${u.id}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `;
          }).join('')}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">${editingUnit ? '機体更新' : '機体追加'}</h2>
      </div>
      <div class="card-body">
      <form id="unit-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${escapeHtml(editingUnitData.name || '')}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">サイズ</label>
          <input name="size" placeholder="サイズ" class="form-control" value="${escapeHtml(editingUnitData.size || '')}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">タイプ</label>
          <input name="type" placeholder="タイプ" class="form-control" value="${escapeHtml(editingUnitData.type || '')}" />
        </div>
        <div class="col-6 col-md-3"><input name="hp" type="number" placeholder="HP" class="form-control" value="${editingUnitData.hp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="baseHp" type="number" placeholder="基礎HP" class="form-control" value="${editingUnitData.baseHp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="partsIncreaseHp" type="number" placeholder="ﾊﾟｰﾂ増加HP" class="form-control" value="${editingUnitData.partsIncreaseHp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${editingUnitData.attack ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${editingUnitData.defense ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${editingUnitData.accuracy ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${editingUnitData.mobility ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="movement" type="number" placeholder="移動" class="form-control" value="${editingUnitData.movement ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="speed" type="number" placeholder="ｽﾋﾟｰﾄﾞ" class="form-control" value="${editingUnitData.speed ?? ''}" /></div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">特殊能力</div>
            <div class="row g-2">
              <div class="col-12 col-md-4"><input name="specialAbilityName" placeholder="特殊能力名" class="form-control" value="${escapeHtml(editingUnitSpecial.name || '')}" /></div>
              <div class="col-12 col-md-8"><input name="specialAbilityEffect" placeholder="特殊能力効果" class="form-control" value="${escapeHtml(editingUnitSpecial.effect || '')}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">地形適性（S/A/B/C/D）</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="terrainAir" placeholder="空" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.air || '') : '')}" /></div>
              <div class="col-6 col-md-3"><input name="terrainLand" placeholder="陸" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.land || '') : '')}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSea" placeholder="海" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.sea || '') : '')}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSpace" placeholder="宇" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.space || '') : '')}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">通常攻撃</div>
            <div class="row g-2">
              <div class="col-12 col-md-3"><input name="normalWeaponName" placeholder="名前" class="form-control" value="${escapeHtml(editingUnitWeapon.name || '')}" /></div>
              <div class="col-12 col-md-3"><input name="normalWeaponType" placeholder="タイプ" class="form-control" value="${escapeHtml(editingUnitWeapon.type || '')}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMin" type="number" placeholder="射程（min）" class="form-control" value="${editingUnitRange.min ?? ''}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMax" type="number" placeholder="射程（max）" class="form-control" value="${editingUnitRange.max ?? ''}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponAction" type="text" inputmode="numeric" placeholder="アク" class="form-control" value="${editingUnitWeapon.action ?? ''}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponUses" type="text" inputmode="numeric" placeholder="回数" class="form-control" value="${editingUnitWeapon.uses ?? ''}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${editingUnit ? '更新' : '追加'}</button>
          ${editingUnit ? '<button type="button" id="cancel-unit-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}
        </div>
      </form>
      </div>
    </div>
    ` : currentView === 'ranking' ? `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">重み付きランキング（機体+パイロット）</h2>
      </div>
      <div class="card-body">
      ${scoredRankingRows.length === 0 ? `
        <div class="text-muted small">パイロットが設定された機体がありません。</div>
      ` : `
      <div class="small text-muted mb-2">スコア重み: HP 15%、攻22%、防22%、照18%、運18%、移2.5%、速2.5%</div>
      <div class="small text-muted mb-2">戦力値: 基礎HP/9 + パーツ増加HP×2/3 + 攻撃力 + 防御力 + 照準値×10 + 運動性×10</div>
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th data-sort="unitName" class="sortable">機体</th>
            <th data-sort="pilotName" class="sortable">パイロット</th>
            <th data-sort="hp" class="sortable">HP</th>
            <th data-sort="attack" class="sortable">攻撃力</th>
            <th data-sort="defense" class="sortable">防御力</th>
            <th data-sort="accuracy" class="sortable">照準値</th>
            <th data-sort="mobility" class="sortable">運動性</th>
            <th data-sort="movement" class="sortable">移動力</th>
            <th data-sort="speed" class="sortable">スピード</th>
            <th data-sort="combatPower" class="sortable">戦力値</th>
            <th data-sort="score" class="sortable">スコア</th>
          </tr>
        </thead>
        <tbody>
          ${scoredRankingRows.map((row, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${row.unitName}</td>
              <td>${row.pilotName}</td>
              <td>${row.hp}</td>
              <td>${row.attack}</td>
              <td>${row.defense}</td>
              <td>${row.accuracy}</td>
              <td>${row.mobility}</td>
              <td>${row.movement}</td>
              <td>${row.speed}</td>
              <td>${row.combatPower}</td>
              <td class="fw-semibold">${row.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
      `}
      </div>
    </div>
    ` : ''}
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
              ${equipCandidates.filter(({ eligible }) => eligible).map(({ skill }, idx) => {
                const skillId = skill?.id ?? '';
                const checked = equippedSet.has(String(skillId)) ? 'checked' : '';
                const label = skill?.name || '(名称未設定)';
                const inputId = `equip-skill-${skillId || idx}`;
                return `<div class="col equip-tile">
                  <input class="btn-check equip-skill" type="checkbox" id="${inputId}" value="${skillId}" ${checked} />
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
    ${currentView === 'unit' ? `
    <div class="modal fade" id="unit-pilot-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-6">パイロット選択</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
          </div>
          <div class="modal-body">
            <label class="form-label small">${selectedUnit?.name || ''}</label>
            <select id="unit-pilot" class="form-select">
              <option value="">未設定</option>
              ${pilots.map(p => `<option value="${p.id}" ${String(p.id) === String(selectedUnitPilotId) ? 'selected' : ''}>${p.name || p.id}</option>`).join('')}
            </select>
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
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="app-toast" class="toast align-items-center text-bg-dark border-0" role="status" aria-live="polite" aria-atomic="true">
        <div class="d-flex">
          <div id="app-toast-message" class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="閉じる"></button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('view-pilot').onclick = () => {
    currentView = 'pilot';
    setViewQuery(currentView);
    equipOpen = false;
    render();
  };
  document.getElementById('view-skill').onclick = () => {
    currentView = 'skill';
    setViewQuery(currentView);
    equipOpen = false;
    render();
  };
  document.getElementById('view-unit').onclick = () => {
    currentView = 'unit';
    setViewQuery(currentView);
    equipOpen = false;
    render();
  };
  document.getElementById('view-ranking').onclick = () => {
    currentView = 'ranking';
    setViewQuery(currentView);
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
  } else if (currentView === 'skill') {
    const skillFilterPilotSelect = document.getElementById('skill-filter-pilot');
    if (skillFilterPilotSelect) {
      skillFilterPilotSelect.onchange = () => {
        skillFilterPilot = skillFilterPilotSelect.value || '';
        render();
      };
    }
    document.getElementById('skill-csv').onchange = handleSkillCSVImport;
    document.getElementById('export-skill').onclick = handleSkillCSVExport;
    document.getElementById('skill-form').onsubmit = handleSkillFormSubmit;
    document.querySelectorAll('.skill-edit').forEach(btn => {
      btn.onclick = () => {
        editingSkillId = btn.getAttribute('data-id');
        render();
      };
    });
    const cancelSkillEditBtn = document.getElementById('cancel-skill-edit');
    if (cancelSkillEditBtn) {
      cancelSkillEditBtn.onclick = () => {
        editingSkillId = null;
        render();
      };
    }
  } else if (currentView === 'unit') {
    document.getElementById('unit-csv').onchange = handleUnitCSVImport;
    document.getElementById('export-unit').onclick = handleUnitCSVExport;
    document.getElementById('unit-form').onsubmit = handleUnitFormSubmit;
    document.querySelectorAll('.unit-edit').forEach(btn => {
      btn.onclick = () => {
        editingUnitId = btn.getAttribute('data-id');
        render();
      };
    });
    const cancelUnitEditBtn = document.getElementById('cancel-unit-edit');
    if (cancelUnitEditBtn) {
      cancelUnitEditBtn.onclick = () => {
        editingUnitId = null;
        render();
      };
    }
    document.querySelectorAll('.unit-select-pilot').forEach(btn => {
      btn.onclick = () => {
        selectedUnitId = btn.getAttribute('data-id');
        unitPilotOpen = true;
        render();
      };
    });
    const unitPilotModalEl = document.getElementById('unit-pilot-modal');
    const unitPilotSelect = document.getElementById('unit-pilot');
    if (unitPilotModalEl && window.bootstrap) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(unitPilotModalEl);
      if (unitPilotOpen) {
        modal.show();
      }
      unitPilotModalEl.addEventListener('hidden.bs.modal', () => {
        unitPilotOpen = false;
        if (currentView === 'unit') {
          render();
        }
      });
    }
    if (unitPilotSelect) {
      unitPilotSelect.onchange = () => {
        const unit = state.units.find(u => String(u.id) === String(selectedUnitId));
        if (!unit) return;
        unit.data = unit.data || {};
        unit.data.pilotId = unitPilotSelect.value || '';
        saveState();
        const modal = window.bootstrap?.Modal.getOrCreateInstance(unitPilotModalEl);
        unitPilotOpen = false;
        modal?.hide();
      };
    }
  } else {
    // ranking view: no page-specific action binding required
  }

  document.querySelectorAll('th.sortable').forEach(th => {
    th.style.cursor = 'pointer';
    th.onclick = () => {
      const key = th.getAttribute('data-sort');
      if (!key) return;
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
  } else if (currentView === 'skill') {
    document.querySelectorAll('.skill-delete').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const idx = state.skills.findIndex(s => String(s.id || s.data?.id) === String(id));
        if (idx !== -1) {
          if (String(editingSkillId) === String(id)) {
            editingSkillId = null;
          }
          state.skills.splice(idx, 1);
          saveState();
          render();
        }
      };
    });
  } else {
    document.querySelectorAll('.unit-delete').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const idx = state.units.findIndex(u => String(u.id || u.data?.id) === String(id));
        if (idx !== -1) {
          if (String(editingUnitId) === String(id)) {
            editingUnitId = null;
          }
          if (String(selectedUnitId) === String(id)) {
            selectedUnitId = null;
          }
          state.units.splice(idx, 1);
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
  if (obj instanceof Unit) {
    if (key === 'specialAbilityName') return String(obj.specialAbility?.name || '').toLowerCase();
    if (key === 'specialAbilityEffect') return String(obj.specialAbility?.effect || '').toLowerCase();
    if (key === 'terrainAir') return String(obj.data?.terrain?.air || '');
    if (key === 'terrainLand') return String(obj.data?.terrain?.land || '');
    if (key === 'terrainSea') return String(obj.data?.terrain?.sea || '');
    if (key === 'terrainSpace') return String(obj.data?.terrain?.space || '');
    if (key === 'normalWeaponName') return String(obj.normalWeapon?.name || '').toLowerCase();
    if (key === 'normalWeaponType') return String(obj.normalWeapon?.type || '').toLowerCase();
    if (key === 'normalWeaponRangeMin') return Number(obj.normalWeapon?.range?.min || 0);
    if (key === 'normalWeaponRangeMax') return Number(obj.normalWeapon?.range?.max || 0);
    if (key === 'normalWeaponAction') {
      const raw = obj.normalWeapon?.action;
      const num = Number(raw);
      return Number.isNaN(num) ? String(raw ?? '').toLowerCase() : num;
    }
    if (key === 'normalWeaponUses') {
      const raw = obj.normalWeapon?.uses;
      const num = Number(raw);
      return Number.isNaN(num) ? String(raw ?? '').toLowerCase() : num;
    }
  }
  const value = obj?.[key];
  if (Array.isArray(value)) return value.join(',');
  if (value === undefined || value === null) return '';
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== '') return num;
  return String(value).toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  const toastEl = document.getElementById('app-toast');
  const messageEl = document.getElementById('app-toast-message');
  if (!toastEl || !messageEl) return;
  messageEl.textContent = message;
  if (window.bootstrap?.Toast) {
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1800 });
    toast.show();
  }
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
      editingSkillId = null;
      saveState();
      render();
    }
  });
}

function parseUnitRow(row) {
  const terrainRank = (value) => {
    const rank = String(value || 'C').trim().toUpperCase();
    return ['S', 'A', 'B', 'C', 'D'].includes(rank) ? rank : 'C';
  };

  const parsedBaseHp = Number(row.baseHp ?? row.baseHP ?? row.hpBase ?? 0);
  const parsedPartsIncreaseHp = Number(row.partsIncreaseHp ?? row.partsHpIncrease ?? row.increaseHp ?? 0);
  const parsedHp = Number(row.hp || 0);
  const baseHp = parsedBaseHp || (parsedHp > 0 ? parsedHp : 0);
  const partsIncreaseHp = parsedPartsIncreaseHp || Math.max(parsedHp - baseHp, 0);
  const hp = parsedHp || (baseHp + partsIncreaseHp);

  return {
    id: row.id || '',
    name: row.name || '',
    pilotId: row.pilotId || '',
    size: row.size || '',
    type: row.type || '',
    hp,
    baseHp,
    partsIncreaseHp,
    attack: Number(row.attack || 0),
    defense: Number(row.defense || 0),
    accuracy: Number(row.accuracy || 0),
    mobility: Number(row.mobility || 0),
    movement: Number(row.movement || 0),
    speed: Number(row.speed || 0),
    specialAbility: {
      name: row.specialAbilityName || row.specialAbility?.name || '',
      effect: row.specialAbilityEffect || row.specialAbility?.effect || '',
    },
    terrain: {
      air: terrainRank(row.terrainAir || row.terrain?.air),
      land: terrainRank(row.terrainLand || row.terrain?.land),
      sea: terrainRank(row.terrainSea || row.terrain?.sea),
      space: terrainRank(row.terrainSpace || row.terrain?.space),
    },
    normalWeapon: {
      name: row.normalWeaponName || row.normalWeapon?.name || '',
      type: row.normalWeaponType || row.normalWeapon?.type || '',
      range: {
        min: Number(row.normalWeaponRangeMin || row.normalWeapon?.range?.min || 0),
        max: Number(row.normalWeaponRangeMax || row.normalWeapon?.range?.max || 0),
      },
      action: parseActionUses(row.normalWeaponAction ?? row.normalWeapon?.action),
      uses: parseActionUses(row.normalWeaponUses ?? row.normalWeapon?.uses),
    },
  };
}

function handleUnitCSVImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      state.units = results.data.map(row => buildUnit(row));
      editingUnitId = null;
      selectedUnitId = null;
      unitPilotOpen = false;
      saveState();
      render();
    }
  });
}

function flattenUnitForCSV(u) {
  const unit = u.data || u;
  return {
    id: unit.id || '',
    name: unit.name || '',
    pilotId: unit.pilotId || '',
    size: unit.size || '',
    type: unit.type || '',
    hp: unit.hp || 0,
    baseHp: unit.baseHp || 0,
    partsIncreaseHp: unit.partsIncreaseHp || 0,
    attack: unit.attack || 0,
    defense: unit.defense || 0,
    accuracy: unit.accuracy || 0,
    mobility: unit.mobility || 0,
    movement: unit.movement || 0,
    speed: unit.speed || 0,
    specialAbilityName: unit.specialAbility?.name || '',
    specialAbilityEffect: unit.specialAbility?.effect || '',
    terrainAir: unit.terrain?.air || 'C',
    terrainLand: unit.terrain?.land || 'C',
    terrainSea: unit.terrain?.sea || 'C',
    terrainSpace: unit.terrain?.space || 'C',
    normalWeaponName: unit.normalWeapon?.name || '',
    normalWeaponType: unit.normalWeapon?.type || '',
    normalWeaponRangeMin: unit.normalWeapon?.range?.min || 0,
    normalWeaponRangeMax: unit.normalWeapon?.range?.max || 0,
    normalWeaponAction: unit.normalWeapon?.action ?? '',
    normalWeaponUses: unit.normalWeapon?.uses ?? '',
  };
}

function handleUnitCSVExport() {
  const csv = Papa.unparse(state.units.map(u => flattenUnitForCSV(u)));
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'units.csv';
  a.click();
  URL.revokeObjectURL(url);
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
  let updated = false;
  const name = formData.get('name') || '';
  const pilotNames = formData.get('pilotNames') || '';
  const effect = formData.get('effect') || '';
  const data = {
    name,
    pilotNames,
    effect,
    attack: Number(formData.get('attack')) || 0,
    defense: Number(formData.get('defense')) || 0,
    accuracy: Number(formData.get('accuracy')) || 0,
    mobility: Number(formData.get('mobility')) || 0,
  };

  if (editingSkillId) {
    const targetIndex = state.skills.findIndex(s => String(s.id || s.data?.id) === String(editingSkillId));
    if (targetIndex !== -1) {
      const current = state.skills[targetIndex];
      const currentId = String(current.id || current.data?.id || editingSkillId);
      state.skills[targetIndex] = new Skill({ data: { id: currentId, ...data } });
      updated = true;
    }
    editingSkillId = null;
  } else {
    const maxId = state.skills.reduce((max, s) => {
      const idNum = Number(s.id || s.data?.id);
      return !isNaN(idNum) && idNum > max ? idNum : max;
    }, 0);
    state.skills.push(new Skill({ data: { id: String(maxId + 1), ...data } }));
  }

  form.reset();
  saveState();
  render();
  if (updated) {
    showToast('スキルを更新しました');
  }
}

function handleUnitFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  let updated = false;

  const hpInputRaw = String(formData.get('hp') ?? '').trim();
  const baseHp = Number(formData.get('baseHp')) || 0;
  const partsIncreaseHp = Number(formData.get('partsIncreaseHp')) || 0;
  const hp = hpInputRaw === '' ? (baseHp + partsIncreaseHp) : (Number(hpInputRaw) || 0);

  const maxId = state.units.reduce((max, u) => {
    const idNum = Number(u.id || u.data?.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = {
    name: formData.get('name') || '',
    size: formData.get('size') || '',
    type: formData.get('type') || '',
    hp,
    baseHp,
    partsIncreaseHp,
    attack: Number(formData.get('attack')) || 0,
    defense: Number(formData.get('defense')) || 0,
    accuracy: Number(formData.get('accuracy')) || 0,
    mobility: Number(formData.get('mobility')) || 0,
    movement: Number(formData.get('movement')) || 0,
    speed: Number(formData.get('speed')) || 0,
    specialAbility: {
      name: formData.get('specialAbilityName') || '',
      effect: formData.get('specialAbilityEffect') || '',
    },
    terrain: {
      air: String(formData.get('terrainAir') || 'C').toUpperCase(),
      land: String(formData.get('terrainLand') || 'C').toUpperCase(),
      sea: String(formData.get('terrainSea') || 'C').toUpperCase(),
      space: String(formData.get('terrainSpace') || 'C').toUpperCase(),
    },
    normalWeapon: {
      name: formData.get('normalWeaponName') || '',
      type: formData.get('normalWeaponType') || '',
      range: {
        min: Number(formData.get('normalWeaponRangeMin')) || 0,
        max: Number(formData.get('normalWeaponRangeMax')) || 0,
      },
      action: parseActionUses(formData.get('normalWeaponAction')),
      uses: parseActionUses(formData.get('normalWeaponUses')),
    },
  };

  if (editingUnitId) {
    const targetIndex = state.units.findIndex(u => String(u.id || u.data?.id) === String(editingUnitId));
    if (targetIndex !== -1) {
      const current = state.units[targetIndex];
      const currentId = String(current.id || current.data?.id || editingUnitId);
      const currentPilotId = current.pilotId || current.data?.pilotId || '';
      state.units[targetIndex] = buildUnit({ id: currentId, pilotId: currentPilotId, ...data });
      updated = true;
    }
    editingUnitId = null;
  } else {
    state.units.push(buildUnit({ id: String(maxId + 1), pilotId: '', ...data }));
  }

  form.reset();
  saveState();
  render();
  if (updated) {
    showToast('機体を更新しました');
  }
}

setViewQuery(currentView);
render();

import { escapeHtml } from '../services/ui.service.js';

export function renderSkillPage({ pilots, filteredSkills, editingSkill, editingSkillData, editingPilotNamesValue, skillFilterPilot }) {
  return `
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
            <button id="export-skill" class="btn btn-sm btn-primary"><i class="bi bi-download me-1"></i>CSVエクスポート</button>
          </div>
        </div>
      </div>
      <div class="card-body"><div class="table-responsive"><table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light"><tr>
          <th data-sort="id" class="sortable">ID</th><th data-sort="name" class="sortable">名前</th><th data-sort="pilotNames" class="sortable">対応パイロット</th>
          <th data-sort="effect" class="sortable">効果</th><th data-sort="attack" class="sortable">攻撃</th><th data-sort="defense" class="sortable">防御</th>
          <th data-sort="accuracy" class="sortable">照準</th><th data-sort="mobility" class="sortable">運動</th><th class="text-center">操作</th>
        </tr></thead>
        <tbody>
          ${filteredSkills.map((s) => `
            <tr>
              <td>${s.id || ''}</td><td>${s.name || ''}</td><td>${s.pilotNames?.join(', ') || ''}</td><td>${s.effect || ''}</td>
              <td>${s.attack || 0}</td><td>${s.defense || 0}</td><td>${s.accuracy || 0}</td><td>${s.mobility || 0}</td>
              <td class="text-center">
                <button class="skill-edit btn btn-sm btn-outline-secondary" data-id="${s.id}" title="更新" aria-label="更新"><i class="bi bi-pencil"></i></button>
                <button class="skill-delete btn btn-sm btn-danger" data-id="${s.id}" title="削除" aria-label="削除"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table></div></div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3"><h2 class="h6 mb-0">${editingSkill ? 'スキル更新' : 'スキル追加'}</h2></div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4"><label class="form-label small">名前</label><input name="name" placeholder="名前" required class="form-control" value="${escapeHtml(editingSkillData.name || '')}" /></div>
        <div class="col-12 col-md-4"><label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" list="pilot-name-list" autocomplete="off" value="${escapeHtml(editingPilotNamesValue)}" />
          <datalist id="pilot-name-list">${pilots.map(p => `<option value="${p.name}">`).join('')}</datalist>
        </div>
        <div class="col-12 col-md-4"><label class="form-label small">その他効果</label><input name="effect" placeholder="その他効果" class="form-control" value="${escapeHtml(editingSkillData.effect || '')}" /></div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${editingSkillData.attack ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${editingSkillData.defense ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${editingSkillData.accuracy ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${editingSkillData.mobility ?? ''}" /></div>
        <div class="col-12"><button type="submit" class="btn btn-primary">${editingSkill ? '更新' : '追加'}</button>${editingSkill ? '<button type="button" id="cancel-skill-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}</div>
      </form>
      </div>
    </div>
  `;
}

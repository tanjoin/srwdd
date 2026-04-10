import { escapeHtml } from '../services/ui.service.js';
import SkillEffectParser from '../model/skill-effect-parser.model.js';

const EFFECT_PARAM_CLASS_MAP = {
  攻撃力: 'skill-param-attack',
  防御力: 'skill-param-defense',
  照準値: 'skill-param-accuracy',
  運動性: 'skill-param-mobility',
};

function formatEffects(effectList = []) {
  return Array.isArray(effectList) ? effectList.join(' / ') : '';
}

function formatSpiritCommand(spiritCommand = {}) {
  const parts = [];

  if (spiritCommand?.name) {
    parts.push(escapeHtml(spiritCommand.name));
  }
  if (spiritCommand?.uses !== '' && spiritCommand?.uses !== undefined && spiritCommand?.uses !== null) {
    parts.push(`${escapeHtml(String(spiritCommand.uses))}回`);
  }
  if (spiritCommand?.description) {
    parts.push(escapeHtml(spiritCommand.description));
  }

  return parts.join(' / ');
}

function renderExpandableCell(contentHtml = '', plainText = '', summaryLabel = '表示') {
  const normalizedText = String(plainText || '').trim();
  if (!normalizedText) {
    return '';
  }

  const tooltipText = escapeHtml(
    normalizedText
      .split(' / ')
      .join('\n')
  );

  return `
    <details class="unit-part-effect-details">
      <summary class="unit-part-effect-summary" title="${tooltipText}">
        <span class="unit-part-effect-trigger" title="${tooltipText}">${summaryLabel}</span>
      </summary>
      <div class="unit-part-effect-body">${contentHtml}</div>
    </details>
  `;
}

function renderHighlightedEffect(effectText = '') {
  const clauses = String(effectText).match(/[^。]+。?/g) || [];

  return clauses.map((clause) => {
    return renderHighlightedClause(clause);
  }).join('');
}

function renderHighlightedClause(clause = '') {
  const ranges = SkillEffectParser.getHighlightableLabelRanges(clause);
  if (ranges.length === 0) {
    return escapeHtml(clause);
  }

  let cursor = 0;
  return ranges.map((range) => {
    const before = escapeHtml(clause.slice(cursor, range.start));
    const className = EFFECT_PARAM_CLASS_MAP[range.label] || '';
    const highlighted = `<span class="skill-effect-param ${className}">${escapeHtml(range.label)}</span>`;
    cursor = range.end;
    return before + highlighted;
  }).join('') + escapeHtml(clause.slice(cursor));
}

export function renderUnitPartsSection({
  sortedUnitParts = [],
  editingUnitPart,
  editingUnitPartData = {},
  units = [],
  pilotById = new Map(),
  unitById = new Map(),
}) {
  const main = editingUnitPartData.main || {};
  const finisher = editingUnitPartData.finisherSlot || {};
  const sub = editingUnitPartData.subSlot || {};
  const mapData = editingUnitPartData.map || {};
  const spiritCommand = editingUnitPartData.spiritCommand || {};
  const isMapChecked = Boolean(mapData.enabled);
  const supportChecked = Boolean(editingUnitPartData.isSupportCategory);
  const selectedUnitId = Array.isArray(editingUnitPartData.unitIds) && editingUnitPartData.unitIds.length
    ? String(editingUnitPartData.unitIds[0])
    : String(editingUnitPartData.unitId || '');
  const compatiblePilotOptions = Array.from(new Map(
    units
      .map((unit) => pilotById.get(String(unit.pilotId)))
      .filter(Boolean)
      .map((pilot) => [String(pilot.id), pilot]),
  ).values());

  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">ユニットパーツ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="unit-parts-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-unit-parts" class="btn btn-sm btn-primary"><i class="bi bi-download me-1"></i>CSVエクスポート</button>
          </div>
        </div>
      </div>
      <div class="card-body"><div class="table-responsive"><table class="table table-sm table-striped table-hover align-middle mb-0 unit-parts-table">
        <thead class="table-light"><tr>
          <th data-sort-target="unitPart" data-sort="id" class="sortable unit-part-col-id">ID</th>
          <th data-sort-target="unitPart" data-sort="name" class="sortable unit-part-col-name">名前</th>
          <th data-sort-target="unitPart" data-sort="unitIds" class="sortable unit-part-col-units">発動可能機体</th>
          <th data-sort-target="unitPart" data-sort="pilotId" class="sortable unit-part-col-pilot">パイロット</th>
          <th data-sort-target="unitPart" data-sort="rarity" class="sortable unit-part-col-short">レア</th>
          <th data-sort-target="unitPart" data-sort="type" class="sortable unit-part-col-type">タイプ</th>
          <th class="unit-part-col-flag">支援</th>
          <th class="unit-part-col-flag">MAP</th>
          <th data-sort-target="unitPart" data-sort="hp" class="sortable unit-part-col-num">HP</th>
          <th data-sort-target="unitPart" data-sort="attack" class="sortable unit-part-col-num">攻</th>
          <th data-sort-target="unitPart" data-sort="defense" class="sortable unit-part-col-num">防</th>
          <th data-sort-target="unitPart" data-sort="accuracy" class="sortable unit-part-col-num">照</th>
          <th data-sort-target="unitPart" data-sort="mobility" class="sortable unit-part-col-num">運</th>
          <th data-sort-target="unitPart" data-sort="terrainAir" class="sortable unit-part-col-rank">空</th>
          <th data-sort-target="unitPart" data-sort="terrainLand" class="sortable unit-part-col-rank">陸</th>
          <th data-sort-target="unitPart" data-sort="terrainSea" class="sortable unit-part-col-rank">海</th>
          <th data-sort-target="unitPart" data-sort="terrainSpace" class="sortable unit-part-col-rank">宇</th>
          <th data-sort-target="unitPart" data-sort="power" class="sortable unit-part-col-num">威力%</th>
          <th data-sort-target="unitPart" data-sort="spiritCommandName" class="sortable unit-part-col-spirit">精神コマンド</th>
          <th class="unit-part-effect-col">MAIN</th><th class="unit-part-effect-col">必殺</th><th class="unit-part-effect-col">SUB</th><th class="text-center unit-part-col-actions">操作</th>
        </tr></thead>
        <tbody>
          ${sortedUnitParts.map((part) => {
            const unitNames = (part.unitIds || []).map((unitId) => unitById.get(String(unitId))?.name || '').filter(Boolean).join(', ');
            const pilotName = pilotById.get(String(part.pilotId))?.name || '';
            return `
            <tr>
              <td class="unit-part-col-id">${part.id || ''}</td><td class="unit-part-col-name" title="${escapeHtml(part.name || '')}"><span class="unit-part-name-text">${escapeHtml(part.name || '')}</span></td><td class="unit-part-col-units">${escapeHtml(unitNames)}</td><td class="unit-part-col-pilot">${escapeHtml(pilotName)}</td><td class="unit-part-col-short">${escapeHtml(part.rarity || '')}</td><td class="unit-part-col-type">${escapeHtml(part.type || '')}</td><td class="unit-part-col-flag">${part.isSupportCategory ? '○' : ''}</td><td class="unit-part-col-flag">${part.map?.enabled ? '○' : ''}</td>
              <td class="unit-part-col-num">${part.hp || 0}</td><td class="unit-part-col-num">${part.attack || 0}</td><td class="unit-part-col-num">${part.defense || 0}</td><td class="unit-part-col-num">${part.accuracy || 0}</td><td class="unit-part-col-num">${part.mobility || 0}</td><td class="unit-part-col-rank">${escapeHtml(part.terrain?.air || '')}</td><td class="unit-part-col-rank">${escapeHtml(part.terrain?.land || '')}</td><td class="unit-part-col-rank">${escapeHtml(part.terrain?.sea || '')}</td><td class="unit-part-col-rank">${escapeHtml(part.terrain?.space || '')}</td><td class="unit-part-col-num">${part.power || 0}</td>
              <td class="unit-part-effect-cell unit-part-col-spirit">${renderSpiritCommandCell(part.spiritCommand)}</td>
              <td class="unit-part-effect-cell ${hasSlotDescription(part.mainSlot) ? '' : 'unit-part-effect-cell-empty'}">${renderSlotLabel(part.mainSlot)}</td><td class="unit-part-effect-cell ${hasSlotDescription(part.finisherSlot) ? '' : 'unit-part-effect-cell-empty'}">${renderSlotLabel(part.finisherSlot)}</td><td class="unit-part-effect-cell ${hasSlotDescription(part.subSlot) ? '' : 'unit-part-effect-cell-empty'}">${renderSlotLabel(part.subSlot)}</td>
              <td class="text-center unit-part-col-actions">
                <button class="unit-part-edit btn btn-sm btn-outline-secondary" data-id="${part.id}" title="更新" aria-label="更新"><i class="bi bi-pencil"></i></button>
                <button class="unit-part-delete btn btn-sm btn-danger" data-id="${part.id}" title="削除" aria-label="削除"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `;
          }).join('')}
        </tbody>
      </table></div></div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3"><h2 class="h6 mb-0">${editingUnitPart ? 'ユニットパーツ更新' : 'ユニットパーツ追加'}</h2></div>
      <div class="card-body">
        <form id="unit-part-form" class="row g-3">
          <div class="col-12 col-md-4"><input name="partName" placeholder="名前" required class="form-control" value="${escapeHtml(editingUnitPartData.name || '')}" /></div>
          <div class="col-12 col-md-4"><select id="part-unit-id" name="partUnitId" class="form-select" ${supportChecked ? 'disabled' : ''}><option value="">適合機体</option>${units.map((unit) => `<option value="${unit.id}" ${String(unit.id) === selectedUnitId ? 'selected' : ''}>${escapeHtml(unit.name || unit.id)}</option>`).join('')}</select></div>
          <div class="col-12 col-md-4"><select id="part-pilot-id" name="partPilotId" class="form-select" ${supportChecked ? 'disabled' : ''}><option value="">適合パイロット</option>${compatiblePilotOptions.map((pilot) => {
            const selected = String(pilot.id) === String(editingUnitPartData.pilotId || '') ? 'selected' : '';
            return `<option value="${pilot.id}" ${selected}>${escapeHtml(pilot.name || pilot.id)}</option>`;
          }).join('')}</select></div>
          <div class="col-6 col-md-2 form-check d-flex align-items-center ms-2"><input id="part-is-support" name="partIsSupport" type="checkbox" class="form-check-input me-2" ${supportChecked ? 'checked' : ''} /><label for="part-is-support" class="form-check-label">支援カテゴリ</label></div>
          <div class="col-6 col-md-2 form-check d-flex align-items-center"><input id="part-is-map" name="partIsMap" type="checkbox" class="form-check-input me-2" ${isMapChecked ? 'checked' : ''} /><label for="part-is-map" class="form-check-label">MAP</label></div>
          <div class="col-6 col-md-2"><input name="partRarity" placeholder="レアリティ" class="form-control" value="${escapeHtml(editingUnitPartData.rarity || '')}" /></div>
          <div id="part-combat-fields" class="col-12 ${supportChecked ? 'd-none' : ''}"><div class="row g-3">
            <div class="col-6 col-md-2"><input name="partType" placeholder="タイプ" class="form-control" value="${escapeHtml(editingUnitPartData.type || '')}" /></div>
            <div class="col-6 col-md-2"><input name="partPower" type="number" placeholder="威力%" class="form-control" value="${editingUnitPartData.power ?? ''}" /></div>
            <div class="col-6 col-md-2"><input name="partHitRate" type="number" placeholder="命中%" class="form-control" value="${editingUnitPartData.hitRate ?? ''}" /></div>
            <div id="part-range-fields" class="col-12 col-md-4 ${isMapChecked ? 'd-none' : ''}"><div class="row g-3">
              <div class="col-6"><input name="partRangeMin" type="number" placeholder="射min" class="form-control" value="${editingUnitPartData.range?.min ?? ''}" /></div>
              <div class="col-6"><input name="partRangeMax" type="number" placeholder="射max" class="form-control" value="${editingUnitPartData.range?.max ?? ''}" /></div>
            </div></div>
            <div class="col-6 col-md-1"><input name="partAction" placeholder="アク" class="form-control" value="${editingUnitPartData.action ?? ''}" /></div>
            <div class="col-6 col-md-1"><input name="partUses" placeholder="回数" class="form-control" value="${editingUnitPartData.uses ?? ''}" /></div>
          </div></div>
          <div id="part-spirit-fields" class="col-12 ${supportChecked ? '' : 'd-none'}"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">精神コマンド</div><div class="row g-2">
            <div class="col-12 col-md-3"><input name="partSpiritCommandName" placeholder="名称" class="form-control" value="${escapeHtml(spiritCommand.name || '')}" /></div>
            <div class="col-12 col-md-2"><input name="partSpiritCommandUses" placeholder="使用回数" class="form-control" value="${escapeHtml(String(spiritCommand.uses ?? ''))}" /></div>
            <div class="col-12 col-md-7"><input name="partSpiritCommandDescription" placeholder="効果説明" class="form-control" value="${escapeHtml(spiritCommand.description || '')}" /></div>
          </div></div></div>
          <div class="col-6 col-md-1"><input name="partHp" type="number" placeholder="HP" class="form-control" value="${editingUnitPartData.hp ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="partAttack" type="number" placeholder="攻" class="form-control" value="${editingUnitPartData.attack ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="partDefense" type="number" placeholder="防" class="form-control" value="${editingUnitPartData.defense ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="partAccuracy" type="number" placeholder="照" class="form-control" value="${editingUnitPartData.accuracy ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="partMobility" type="number" placeholder="運" class="form-control" value="${editingUnitPartData.mobility ?? ''}" /></div>
          <div class="col-6 col-md-2"><input name="partTrait" type="number" placeholder="特性" class="form-control" value="${editingUnitPartData.trait ?? ''}" /></div>
          <div class="col-12"><div class="row g-3">
            <div class="col-6 col-md-2"><input name="partTerrainAir" maxlength="1" placeholder="空" class="form-control" value="${escapeHtml(editingUnitPartData.terrain?.air || '')}" /></div>
            <div class="col-6 col-md-2"><input name="partTerrainLand" maxlength="1" placeholder="陸" class="form-control" value="${escapeHtml(editingUnitPartData.terrain?.land || '')}" /></div>
            <div class="col-6 col-md-2"><input name="partTerrainSea" maxlength="1" placeholder="海" class="form-control" value="${escapeHtml(editingUnitPartData.terrain?.sea || '')}" /></div>
            <div class="col-6 col-md-2"><input name="partTerrainSpace" maxlength="1" placeholder="宇" class="form-control" value="${escapeHtml(editingUnitPartData.terrain?.space || '')}" /></div>
          </div></div>
          <div id="part-map-fields" class="col-12 ${isMapChecked ? '' : 'd-none'}"><div class="row g-3">
            <div class="col-12 col-md-3"><input name="partMapLabel" placeholder="射程表示 (例: MAP Lv1)" class="form-control" value="${escapeHtml(mapData.label || '')}" /></div>
            <div class="col-12 col-md-3"><input name="partMapTarget" placeholder="対象" class="form-control" value="${escapeHtml(mapData.target || '')}" /></div>
            <div class="col-12 col-md-3"><input name="partMapAreaType" placeholder="範囲タイプ" class="form-control" value="${escapeHtml(mapData.areaType || '')}" /></div>
          </div></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">MAIN</div><div class="row g-2">
            <div class="col-12 col-md-3"><input name="partMainName" placeholder="名称" class="form-control" value="${escapeHtml(main.name || '')}" /></div>
            <div class="col-12 col-md-9"><input name="partMainDescription" placeholder="説明" class="form-control" value="${escapeHtml(main.description || '')}" /></div>
          </div></div></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">必殺スロット</div><div class="row g-2">
            <div class="col-12 col-md-3"><input name="partFinisherName" placeholder="名称" class="form-control" value="${escapeHtml(finisher.name || '')}" /></div>
            <div class="col-12 col-md-9"><input name="partFinisherDescription" placeholder="説明" class="form-control" value="${escapeHtml(finisher.description || '')}" /></div>
          </div></div></div>
          <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">SUB</div><div class="row g-2">
            <div class="col-12 col-md-3"><input name="partSubName" placeholder="名称" class="form-control" value="${escapeHtml(sub.name || '')}" /></div>
            <div class="col-12 col-md-9"><input name="partSubDescription" placeholder="説明" class="form-control" value="${escapeHtml(sub.description || '')}" /></div>
          </div></div></div>
          <div class="col-12"><button type="submit" class="btn btn-primary">${editingUnitPart ? '更新' : '追加'}</button>${editingUnitPart ? '<button type="button" id="cancel-unit-part-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}</div>
        </form>
      </div>
    </div>
  `;
}

function renderSlotLabel(slot) {
  const parts = [];
  const rawParts = [];

  if (slot?.name) {
    const escapedName = escapeHtml(slot.name);
    parts.push(`<div class="unit-part-effect-name">${escapedName}</div>`);
    rawParts.push(slot.name);
  }
  if (slot?.description) {
    parts.push(`<div>${renderHighlightedEffect(slot.description)}</div>`);
    rawParts.push(slot.description);
  }
  if (Array.isArray(slot?.effect) && slot.effect.length) {
    parts.push(slot.effect.map((effect) => `<div>${renderHighlightedEffect(effect)}</div>`).join(''));
    rawParts.push(...slot.effect);
  }

  const summaryLabel = slot?.name
    ? escapeHtml(slot.name)
    : '表示';

  return renderExpandableCell(parts.join(''), rawParts.join(' / '), summaryLabel);
}

function renderSpiritCommandCell(spiritCommand) {
  const parts = [];
  const rawParts = [];

  if (spiritCommand?.name) {
    const escapedName = escapeHtml(spiritCommand.name);
    parts.push(`<div class="unit-part-effect-name">${escapedName}</div>`);
    rawParts.push(spiritCommand.name);
  }
  if (spiritCommand?.uses !== '' && spiritCommand?.uses !== undefined && spiritCommand?.uses !== null) {
    const usesLabel = `${escapeHtml(String(spiritCommand.uses))}回`;
    parts.push(`<div class="unit-part-effect-meta">${usesLabel}</div>`);
    rawParts.push(`${spiritCommand.uses}回`);
  }
  if (spiritCommand?.description) {
    parts.push(`<div>${escapeHtml(spiritCommand.description)}</div>`);
    rawParts.push(spiritCommand.description);
  }

  const summaryLabel = spiritCommand?.name
    ? escapeHtml(spiritCommand.name)
    : '表示';

  return renderExpandableCell(parts.join(''), rawParts.join(' / '), summaryLabel);
}

function hasSlotDescription(slot) {
  return String(slot?.description || '').trim() !== '';
}
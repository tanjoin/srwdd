import { escapeHtml } from '../services/ui.service.js';

export function renderUnitForm({ editingUnit, editingUnitData, editingUnitSpecial, editingUnitTerrain, editingUnitWeapon, editingUnitRange }) {
  return `
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3"><h2 class="h6 mb-0">${editingUnit ? '機体更新' : '機体追加'}</h2></div>
      <div class="card-body">
      <form id="unit-form" class="row g-3">
        <div class="col-12 col-md-4"><label class="form-label small">名前</label><input name="name" placeholder="名前" required class="form-control" value="${escapeHtml(editingUnitData.name || '')}" /></div>
        <div class="col-6 col-md-4"><label class="form-label small">サイズ</label><input name="size" placeholder="サイズ" class="form-control" value="${escapeHtml(editingUnitData.size || '')}" /></div>
        <div class="col-6 col-md-4"><label class="form-label small">タイプ</label><input name="type" placeholder="タイプ" class="form-control" value="${escapeHtml(editingUnitData.type || '')}" /></div>
        <div class="col-6 col-md-3"><input name="hp" type="number" placeholder="HP" class="form-control" value="${editingUnitData.hp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="baseHp" type="number" placeholder="基礎HP" class="form-control" value="${editingUnitData.baseHp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="partsIncreaseHp" type="number" placeholder="ﾊﾟｰﾂ増加HP" class="form-control" value="${editingUnitData.partsIncreaseHp ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${editingUnitData.attack ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${editingUnitData.defense ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${editingUnitData.accuracy ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${editingUnitData.mobility ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="movement" type="number" placeholder="移動" class="form-control" value="${editingUnitData.movement ?? ''}" /></div>
        <div class="col-6 col-md-3"><input name="speed" type="number" placeholder="ｽﾋﾟｰﾄﾞ" class="form-control" value="${editingUnitData.speed ?? ''}" /></div>
        <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">特殊能力</div><div class="row g-2">
          <div class="col-12 col-md-4"><input name="specialAbilityName" placeholder="特殊能力名" class="form-control" value="${escapeHtml(editingUnitSpecial.name || '')}" /></div>
          <div class="col-12 col-md-8"><input name="specialAbilityEffect" placeholder="特殊能力効果" class="form-control" value="${escapeHtml(editingUnitSpecial.effect || '')}" /></div>
        </div></div></div>
        <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">地形適性（S/A/B/C/D）</div><div class="row g-2">
          <div class="col-6 col-md-3"><input name="terrainAir" placeholder="空" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.air || '') : '')}" /></div>
          <div class="col-6 col-md-3"><input name="terrainLand" placeholder="陸" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.land || '') : '')}" /></div>
          <div class="col-6 col-md-3"><input name="terrainSea" placeholder="海" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.sea || '') : '')}" /></div>
          <div class="col-6 col-md-3"><input name="terrainSpace" placeholder="宇" class="form-control" maxlength="1" value="${escapeHtml(editingUnit ? (editingUnitTerrain.space || '') : '')}" /></div>
        </div></div></div>
        <div class="col-12 mt-1"><div class="border rounded p-3 bg-light"><div class="fw-semibold mb-2">通常攻撃</div><div class="row g-2">
          <div class="col-12 col-md-3"><input name="normalWeaponName" placeholder="名前" class="form-control" value="${escapeHtml(editingUnitWeapon.name || '')}" /></div>
          <div class="col-12 col-md-3"><input name="normalWeaponType" placeholder="タイプ" class="form-control" value="${escapeHtml(editingUnitWeapon.type || '')}" /></div>
          <div class="col-6 col-md-2"><input name="normalWeaponRangeMin" type="number" placeholder="射程（min）" class="form-control" value="${editingUnitRange.min ?? ''}" /></div>
          <div class="col-6 col-md-2"><input name="normalWeaponRangeMax" type="number" placeholder="射程（max）" class="form-control" value="${editingUnitRange.max ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="normalWeaponAction" type="text" inputmode="numeric" placeholder="アク" class="form-control" value="${editingUnitWeapon.action ?? ''}" /></div>
          <div class="col-6 col-md-1"><input name="normalWeaponUses" type="text" inputmode="numeric" placeholder="回数" class="form-control" value="${editingUnitWeapon.uses ?? ''}" /></div>
        </div></div></div>
        <div class="col-12"><button type="submit" class="btn btn-primary">${editingUnit ? '更新' : '追加'}</button>${editingUnit ? '<button type="button" id="cancel-unit-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>' : ''}</div>
      </form>
      </div>
    </div>
  `;
}

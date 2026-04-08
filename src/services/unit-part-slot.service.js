import Weapon from '../model/weapon.model.js';

function hasSlotContent(slot) {
  if (!slot) return false;
  if (String(slot.name || '').trim()) return true;
  if (String(slot.description || '').trim()) return true;
  if (Array.isArray(slot.effect) && slot.effect.some((item) => String(item || '').trim())) return true;
  return false;
}

export function isPartCompatibleWithUnit(part, unitId, pilotId) {
  if (!part) return false;
  if (isSupportCategory(part)) return true;
  const unitIds = Array.isArray(part.unitIds) ? part.unitIds : [part.unitId].filter(Boolean);
  if (!unitIds.some((currentUnitId) => String(currentUnitId) === String(unitId || ''))) return false;
  if (!part.pilotId) return true;
  return String(part.pilotId) === String(pilotId || '');
}

export function isSupportCategory(part) {
  if (!part) return false;
  return Boolean(part.isSupportCategory) || String(part.type || '') === Weapon.TYPE_SUPPORT;
}

export function isFinisherCategory(part) {
  if (!part) return false;
  return String(part.type || '') === Weapon.TYPE_FINISHER || hasSlotContent(part.finisherSlot);
}

export function isMainSlotEligible(part) {
  if (!part) return false;
  if (isSupportCategory(part)) return true;
  if (hasSlotContent(part.mainSlot)) return true;
  return !hasSlotContent(part.finisherSlot) && !hasSlotContent(part.subSlot);
}

export function isFinisherSlotEligible(part) {
  if (!part) return false;
  return isFinisherCategory(part);
}

export function isSubSlotEligible(part) {
  if (!part) return false;
  return isSupportCategory(part) || hasSlotContent(part.subSlot);
}
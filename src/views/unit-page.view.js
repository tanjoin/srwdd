import { renderUnitTable } from './unit-table.view.js';
import { renderUnitForm } from './unit-form.view.js';

export function renderUnitPage(vm) {
  return `${renderUnitTable(vm)}${renderUnitForm(vm)}`;
}

import { handlePilotFormSubmit as submitPilotForm } from './pilot-form.handler.js';
import { handleSkillFormSubmit as submitSkillForm } from './skill-form.handler.js';
import { handleUnitFormSubmit as submitUnitForm } from './unit-form.handler.js';
import { handleUnitPartFormSubmit as submitUnitPartForm } from './unit-part-form.handler.js';
import { handleAbilityChipFormSubmit as submitAbilityChipForm } from './ability-chip-form.handler.js';

export function createFormHandlers(context) {
  return {
    handlePilotFormSubmit: (e) => submitPilotForm(context, e),
    handleSkillFormSubmit: (e) => submitSkillForm(context, e),
    handleUnitFormSubmit: (e) => submitUnitForm(context, e),
    handleUnitPartFormSubmit: (e) => submitUnitPartForm(context, e),
    handleAbilityChipFormSubmit: (e) => submitAbilityChipForm(context, e),
  };
}

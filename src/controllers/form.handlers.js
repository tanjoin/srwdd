import { handlePilotFormSubmit as submitPilotForm } from './pilot-form.handler.js';
import { handleSkillFormSubmit as submitSkillForm } from './skill-form.handler.js';
import { handleUnitFormSubmit as submitUnitForm } from './unit-form.handler.js';

export function createFormHandlers(context) {
  return {
    handlePilotFormSubmit: (e) => submitPilotForm(context, e),
    handleSkillFormSubmit: (e) => submitSkillForm(context, e),
    handleUnitFormSubmit: (e) => submitUnitForm(context, e),
  };
}

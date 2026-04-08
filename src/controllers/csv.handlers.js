import { createPilotCsvHandlers } from './pilot-csv.handlers.js';
import { createSkillCsvHandlers } from './skill-csv.handlers.js';
import { createUnitCsvHandlers } from './unit-csv.handlers.js';
import { createUnitPartCsvHandlers } from './unit-parts-csv.handlers.js';
import { createAbilityChipCsvHandlers } from './ability-chip-csv.handlers.js';

export function createCsvHandlers(context) {
  const pilotHandlers = createPilotCsvHandlers(context);
  const skillHandlers = createSkillCsvHandlers(context);
  const unitHandlers = createUnitCsvHandlers(context);
  const unitPartHandlers = createUnitPartCsvHandlers(context);
  const abilityChipHandlers = createAbilityChipCsvHandlers(context);

  return {
    ...pilotHandlers,
    ...skillHandlers,
    ...unitHandlers,
    ...unitPartHandlers,
    ...abilityChipHandlers,
  };
}

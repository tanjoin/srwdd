import { createPilotCsvHandlers } from './pilot-csv.handlers.js';
import { createSkillCsvHandlers } from './skill-csv.handlers.js';
import { createUnitCsvHandlers } from './unit-csv.handlers.js';

export function createCsvHandlers(context) {
  const pilotHandlers = createPilotCsvHandlers(context);
  const skillHandlers = createSkillCsvHandlers(context);
  const unitHandlers = createUnitCsvHandlers(context);

  return {
    ...pilotHandlers,
    ...skillHandlers,
    ...unitHandlers,
  };
}

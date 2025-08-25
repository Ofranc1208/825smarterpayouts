// Export hub for all state data
// Following enterprise modularity patterns

import { stateDataA_M } from './stateDataA-M';
import { stateDataN_Z } from './stateDataN-Z';

export { stateDataA_M } from './stateDataA-M';
export { stateDataN_Z } from './stateDataN-Z';
export { states, groupStatesAlpha } from './statesList';

// Combined state law details object - ALL 50 STATES + DC
export const stateLawDetails = {
  ...stateDataA_M,
  ...stateDataN_Z,
};

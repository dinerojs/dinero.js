import type BN from 'bn.js';

import { calculator } from '@dinero.js/calculator-bn.js';
import { createDinero } from 'dinero.js';
import type { DineroOptions } from 'dinero.js';

const dinero = createDinero({ calculator });

export function createBnjsDinero(options: DineroOptions<BN>) {
  return dinero(options);
}

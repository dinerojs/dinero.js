import { calculator } from '@dinero.js/calculator-bigint';
import { createDinero } from 'dinero.js';
import type { DineroOptions } from 'dinero.js';

const dinero = createDinero({ calculator });

export function createBigintDinero(options: DineroOptions<bigint>) {
  return dinero(options);
}

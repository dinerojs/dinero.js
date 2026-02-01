import { dinero } from 'dinero.js/bigint';
import type { DineroOptions } from 'dinero.js';

export function createBigintDinero(options: DineroOptions<bigint>) {
  return dinero(options);
}

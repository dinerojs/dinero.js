import { dinero } from 'dinero.js/bigint';
import type { DineroOptions } from 'dinero.js';

export function createBigintDinero<TCurrency extends string>(
  options: DineroOptions<bigint, TCurrency>
) {
  return dinero(options);
}

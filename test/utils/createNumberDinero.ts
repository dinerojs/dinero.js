import { dinero } from 'dinero.js';
import type { DineroOptions } from 'dinero.js';

export function createNumberDinero<TCurrency extends string>(
  options: DineroOptions<number, TCurrency>
) {
  return dinero(options);
}

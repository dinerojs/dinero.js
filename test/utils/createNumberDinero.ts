import { dinero } from 'dinero.js';
import type { DineroOptions } from 'dinero.js';

export function createNumberDinero(options: DineroOptions<number>) {
  return dinero(options);
}

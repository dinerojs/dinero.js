import { assert } from '../utils/assert';

export function assertSameCurrency(condition: boolean) {
  return assert(condition, "Dinero objects don't have the same currency.");
}

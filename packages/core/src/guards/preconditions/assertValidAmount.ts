import { assert } from '../utils';

export function assertValidAmount(condition: boolean) {
  return assert(condition, RangeError, 'Amount is invalid.');
}

import { assert } from '../helpers';

export function assertValidAmount(condition: boolean) {
  return assert(condition, RangeError, 'Amount is invalid.');
}

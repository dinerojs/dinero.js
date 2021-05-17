import { assert } from '../utils';

export function assertValidAmount(condition: boolean) {
  return assert(condition, 'Amount is invalid.');
}

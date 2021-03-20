import { assert } from '../helpers';

export function assertValidScale(condition: boolean) {
  return assert(condition, RangeError, 'Scale is invalid.');
}

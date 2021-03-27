import { assert } from '../utils';

export function assertValidScale(condition: boolean) {
  return assert(condition, RangeError, 'Scale is invalid.');
}

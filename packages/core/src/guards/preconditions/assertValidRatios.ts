import { assert } from '../utils';

export function assertValidRatios(condition: boolean) {
  return assert(condition, RangeError, 'Ratios are invalid.');
}

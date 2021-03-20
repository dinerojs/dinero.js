import { assert } from '../helpers';

export function assertValidRatios(condition: boolean) {
  return assert(condition, RangeError, 'Ratios are invalid.');
}

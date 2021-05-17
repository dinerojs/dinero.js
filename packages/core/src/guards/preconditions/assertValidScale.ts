import { assert } from '../utils';

export function assertValidScale(condition: boolean) {
  return assert(condition, 'Scale is invalid.');
}

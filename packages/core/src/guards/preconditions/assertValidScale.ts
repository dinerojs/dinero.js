import assert from '../helpers/assert';

function assertValidScale(condition: boolean) {
  return assert(condition, RangeError, 'Scale is invalid.');
}

export default assertValidScale;

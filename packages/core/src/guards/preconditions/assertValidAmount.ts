import assert from '../helpers/assert';

function assertValidAmount(condition: boolean) {
  return assert(condition, RangeError, 'Amount is invalid.');
}

export default assertValidAmount;

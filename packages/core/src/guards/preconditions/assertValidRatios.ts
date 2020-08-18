import assert from '../helpers/assert';

function assertValidRatios(condition: boolean) {
  return assert(condition, RangeError, 'Ratios are invalid.');
}

export default assertValidRatios;

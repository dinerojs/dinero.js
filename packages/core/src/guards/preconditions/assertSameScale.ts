import assert from '../helpers/assert';

function assertSameScale(condition: boolean) {
  return assert(
    condition,
    TypeError,
    "Dinero objects don't have the same scale."
  );
}

export default assertSameScale;

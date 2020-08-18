import assert from '../helpers/assert';

function assertSameCurrency(condition: boolean) {
  return assert(
    condition,
    TypeError,
    "Dinero objects don't have the same currency."
  );
}

export default assertSameCurrency;

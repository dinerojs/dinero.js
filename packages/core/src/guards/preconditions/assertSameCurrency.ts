import { assert } from '../helpers/assert';

export function assertSameCurrency(condition: boolean) {
  return assert(
    condition,
    TypeError,
    "Dinero objects don't have the same currency."
  );
}

import { assert } from '../utils/assert';

export function assertSameCurrency(condition: boolean) {
  return assert(
    condition,
    TypeError,
    "Dinero objects don't have the same currency."
  );
}

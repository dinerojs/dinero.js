import { assert } from '../helpers/assert';

export function assertSameScale(condition: boolean) {
  return assert(
    condition,
    TypeError,
    "Dinero objects don't have the same scale."
  );
}

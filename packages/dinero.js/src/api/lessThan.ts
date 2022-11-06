import { safeLessThan } from '@dinero.js/core';
import type { LessThanParams } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 *
 * @public
 */
export function lessThan<TAmount>(
  ...[dineroObject, comparator]: LessThanParams<TAmount>
) {
  const { calculator } = dineroObject;
  const lessThanFn = safeLessThan(calculator);

  return lessThanFn(dineroObject, comparator);
}

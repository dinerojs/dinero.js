import { safeGreaterThan } from '../core';
import type { GreaterThanParams } from '../core';

/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 *
 * @public
 */
export function greaterThan<TAmount, TCurrency extends string>(
  ...[dineroObject, comparator]: GreaterThanParams<TAmount, TCurrency>
) {
  const { calculator } = dineroObject;
  const greaterThanFn = safeGreaterThan(calculator);

  return greaterThanFn(dineroObject, comparator);
}

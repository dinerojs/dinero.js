import { safeCompare } from '@dinero.js/core';

import type { CompareParams } from '@dinero.js/core';

/**
 * Compares the value of a Dinero object relative to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns A negative number if the Dinero to compare is than the other;
 *          0 if they are equal;
 *          or a positive number if it is greater.
 */
export function compare<TAmount>(
  ...[dineroObject, comparator]: CompareParams<TAmount>
) {
  const { calculator } = dineroObject;
  const compareFn = safeCompare({ calculator });

  return compareFn(dineroObject, comparator);
}

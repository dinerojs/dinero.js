import type { Calculator } from '@dinero.js/calculator';

import { equal, greaterThan } from '.';

type GreaterThanOrEqualCalculator<TAmount> = Pick<
  Calculator<TAmount>,
  'compare'
>;

/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
export function greaterThanOrEqual<TAmount>(
  calculator: GreaterThanOrEqualCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      greaterThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

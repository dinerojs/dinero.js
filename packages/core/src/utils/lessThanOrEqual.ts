import { equal } from './equal';
import { lessThan } from './lessThan';

import type { Calculator } from '../types';

type LessThanOrEqualCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export function lessThanOrEqual<TAmount>(
  calculator: LessThanOrEqualCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      lessThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

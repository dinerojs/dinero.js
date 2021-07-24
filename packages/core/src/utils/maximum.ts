import { lessThan } from './lessThan';

import type { Calculator } from '../types';

type MaximumCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a maximum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The maximum function.
 */
export function maximum<TAmount>(calculator: MaximumCalculator<TAmount>) {
  const lessThanFn = lessThan(calculator);

  return (values: readonly TAmount[]) => {
    return values.reduce((acc, curr) => {
      return lessThanFn(acc, curr) ? curr : acc;
    });
  };
}

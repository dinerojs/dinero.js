import type { Calculator } from '@dinero.js/calculator';

import { lessThan } from '.';

type MaximumCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

/**
 * Returns a maximum function.
 *
 * @param calculator The calculator to use.
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

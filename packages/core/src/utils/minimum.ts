import type { Calculator } from '@dinero.js/calculator';

import { greaterThan } from '.';

type MinimumCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

/**
 * Returns a minimum function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The minimum function.
 */
export function minimum<TAmount>(calculator: MinimumCalculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);

  return (values: readonly TAmount[]) => {
    return values.reduce((acc, curr) => {
      return greaterThanFn(acc, curr) ? curr : acc;
    });
  };
}

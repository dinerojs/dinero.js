import { Calculator } from '..';
import { lessThan } from '.';

/**
 * Returns a maximum function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The maximum function.
 */
export function maximum<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  const lessThanFn = lessThan(calculator);

  return (values: readonly TAmount[]) => {
    return values.reduce((acc, curr) => (lessThanFn(acc, curr) ? curr : acc));
  };
}

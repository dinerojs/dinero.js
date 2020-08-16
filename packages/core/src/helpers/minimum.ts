import { Calculator } from '../calculator';
import { greaterThan } from '.';

/**
 * Returns a minimum function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The minimum function.
 */
function maximum<TAmount>(calculator: Pick<Calculator<TAmount>, 'compare'>) {
  const greaterThanFn = greaterThan(calculator);

  return (values: readonly TAmount[]) => {
    return values.reduce((acc, curr) =>
      greaterThanFn(acc, curr) ? curr : acc
    );
  };
}

export default maximum;

/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */
import { Calculator, RoundingMode } from '..';
import { equal } from '.';

/**
 * Returns a distribute function.
 *
 * @param calculator The calculator to use.
 * @param down A floor function.
 *
 * @returns The distribute function.
 */
function distribute<TAmount>(
  calculator: Pick<
    Calculator<TAmount>,
    | 'add'
    | 'compare'
    | 'divide'
    | 'increment'
    | 'multiply'
    | 'subtract'
    | 'zero'
  >,
  down: RoundingMode<TAmount> = (n) => n
) {
  return (value: TAmount, ratios: readonly TAmount[]) => {
    const zero = calculator.zero();
    const one = calculator.increment(zero);

    const total = ratios.reduce((a, b) => calculator.add(a, b), zero);

    if (equal(calculator)(total, zero)) {
      return ratios;
    }

    let remainder = value;

    const shares = ratios.map((ratio) => {
      const share =
        down(calculator.divide(calculator.multiply(value, ratio), total)) ||
        zero;

      remainder = calculator.subtract(remainder, share);

      return share;
    });

    let i = 0;

    while (remainder > zero) {
      if (ratios[i] !== zero) {
        shares[i] = calculator.add(shares[i], one);
        remainder = calculator.subtract(remainder, one);
      }

      i++;
    }

    return shares;
  };
}

export default distribute;

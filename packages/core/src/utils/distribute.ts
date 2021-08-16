/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */

import type { Calculator } from '../types';

import { equal } from './equal';
import { greaterThan } from './greaterThan';
import { greaterThanOrEqual } from './greaterThanOrEqual';
import { lessThan } from './lessThan';

type DistributeCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a distribute function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The distribute function.
 */
export function distribute<TAmount>(calculator: DistributeCalculator<TAmount>) {
  return (value: TAmount, ratios: readonly TAmount[]) => {
    const equalFn = equal(calculator);
    const greaterThanFn = greaterThan(calculator);
    const lessThanFn = lessThan(calculator);
    const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

    const zero = calculator.zero();
    const one = calculator.increment(zero);

    const total = ratios.reduce((a, b) => calculator.add(a, b), zero);

    if (equalFn(total, zero)) {
      return ratios;
    }

    let remainder = value;

    const shares = ratios.map((ratio) => {
      const share =
        calculator.integerDivide(calculator.multiply(value, ratio), total) ||
        zero;

      remainder = calculator.subtract(remainder, share);

      return share;
    });

    const isPositive = greaterThanOrEqualFn(value, zero);
    const compare = isPositive ? greaterThanFn : lessThanFn;
    const amount = isPositive ? one : calculator.decrement(zero);

    let i = 0;

    while (compare(remainder, zero)) {
      if (!equalFn(ratios[i], zero)) {
        shares[i] = calculator.add(shares[i], amount);
        remainder = calculator.subtract(remainder, amount);
      }

      i++;
    }

    return shares;
  };
}

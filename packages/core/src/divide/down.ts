import type { DivideOperation } from '..';
import { equal, greaterThan } from '../utils';

/**
 * Divide and round down.
 *
 * Rounding down happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export const down: DivideOperation = (amount, factor, calculator) => {
  const greaterThanFn = greaterThan(calculator);
  const equalFn = equal(calculator);

  const zero = calculator.zero();
  const isPositive = greaterThanFn(amount, zero);
  const quotient = calculator.integerDivide(amount, factor);
  const remainder = calculator.modulo(amount, factor);
  const isInteger = equalFn(remainder, zero);

  if (isPositive || isInteger) {
    return quotient;
  }

  return calculator.decrement(quotient);
};

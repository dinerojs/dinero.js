import { divide, compare, power, halfUp } from '../../number';
import { countFractionDigits, isFloat } from '../helpers';
import { BinaryOperation } from '../../types';
import { maximum } from '../../helpers';

const getFactor = (value: number) => power(10, countFractionDigits(value));

const multiplyFloats: BinaryOperation<number> = (multiplier, multiplicand) => {
  const factor = maximum({ compare })([
    getFactor(multiplier),
    getFactor(multiplicand),
  ]);

  return divide(
    halfUp(multiplier * factor) * halfUp(multiplicand * factor),
    factor * factor
  );
};

/**
 * Returns the product of two numbers.
 *
 * @param multiplier The number to multiply.
 * @param multiplicand The number to multiply with.
 *
 * @returns The product of the two numbers.
 */
export const multiply: BinaryOperation<number> = (multiplier, multiplicand) => {
  return isFloat(multiplier) || isFloat(multiplicand)
    ? multiplyFloats(multiplier, multiplicand)
    : multiplier * multiplicand;
};

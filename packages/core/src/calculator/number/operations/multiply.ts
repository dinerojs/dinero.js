import { VariadicOperation } from '@dinero.js/core';
import { maximum, power, halfUp } from '@dinero.js/core/calculator/number';
import { countFractionDigits, isFloat } from '../helpers';

const getFactor = (value: number) => power(10, countFractionDigits(value));

const multiplyFloats: VariadicOperation<number> = (...values) => {
  const factor = maximum(...values.map((value) => getFactor(value)));

  return (
    values.reduce((acc, curr) => halfUp(acc * factor) * halfUp(curr * factor)) /
    (factor * factor)
  );
};

/**
 * Returns the product of a set numbers.
 *
 * @param values The numbers to multiply.
 *
 * @returns The product of the set of numbers.
 */
const multiply: VariadicOperation<number> = (...values) => {
  const hasFloats = values.some((value) => isFloat(value));

  return hasFloats
    ? multiplyFloats(...values)
    : values.reduce((acc, curr) => acc * curr);
};

export default multiply;

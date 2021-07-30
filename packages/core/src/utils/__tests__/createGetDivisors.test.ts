import { calculator } from '@dinero.js/calculator-number';

import { createGetDivisors } from '../createGetDivisors';

const getDivisors = createGetDivisors(calculator);

describe('#getDivisors', () => {
  it('returns the same divisor with one base', () => {
    expect(getDivisors([100])).toEqual([100]);
  });
  it('recursively computes divisors with two bases', () => {
    expect(getDivisors([20, 12])).toEqual([240, 12]);
  });
  it('recursively computes divisors with more than two bases', () => {
    expect(getDivisors([20, 12, 7])).toEqual([1680, 84, 7]);
  });
});

import { integerDivide } from '../integerDivide.js';

describe('integerDivide', () => {
  it('divides positive numbers', () => {
    expect(integerDivide(6n, 2n)).toBe(3n);
  });
  it('divides with truncation', () => {
    expect(integerDivide(7n, 2n)).toBe(3n);
  });
});
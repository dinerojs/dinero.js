import { calculator } from '@dinero.js/calculator-number';

import { countTrailingZeros } from '../countTrailingZeros';

const countTrailingZerosFn = countTrailingZeros(calculator);

describe('countTrailingZeros', () => {
  it('counts trailing zeros from a positive integer', () => {
    expect(countTrailingZerosFn(1000, 10)).toEqual(3);
  });
  it('counts trailing zeros from a negative integer', () => {
    expect(countTrailingZerosFn(-1000, 10)).toEqual(3);
  });
  it('counts trailing zeros from a positive integer in scientific notation', () => {
    expect(countTrailingZerosFn(1e3, 10)).toEqual(3);
  });
  it('counts trailing zeros from a negative integer in scientific notation', () => {
    expect(countTrailingZerosFn(-1e3, 10)).toEqual(3);
  });
  it("doesn't retrieve trailing zeros when there are none", () => {
    expect(countTrailingZerosFn(123, 10)).toEqual(0);
  });
  it("doesn't retrieve trailing zeros from floats", () => {
    expect(countTrailingZerosFn(12.5, 10)).toEqual(0);
  });
  it('correctly handles zero inputs', () => {
    expect(countTrailingZerosFn(0, 10)).toEqual(0);
    expect(countTrailingZerosFn(0, 2)).toEqual(0);
  });
});

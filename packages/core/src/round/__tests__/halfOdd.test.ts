import { halfOdd } from '../halfOdd';

describe('halfOdd', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfOdd(1.4)).toBe(1);
  });
  it('rounds down with a negative float below half', () => {
    expect(halfOdd(-1.4)).toBe(-1);
  });
  it('rounds to nearest odd integer with a positive half float rounding to an even integer', () => {
    expect(halfOdd(1.5)).toBe(1);
  });
  it('rounds to nearest odd integer with a positive half float rounding to an odd integer', () => {
    expect(halfOdd(2.5)).toBe(3);
  });
  it('rounds to nearest odd integer with a negative half float', () => {
    expect(halfOdd(-2.5)).toBe(-3);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfOdd(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfOdd(-1.6)).toBe(-2);
  });
});

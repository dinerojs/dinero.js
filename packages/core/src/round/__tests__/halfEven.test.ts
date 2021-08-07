import { halfEven } from '../halfEven';

describe('halfEven', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfEven(1.4)).toBe(1);
  });
  it('rounds down with a negative float below half', () => {
    expect(halfEven(-1.4)).toBe(-1);
  });
  it('rounds to nearest even integer with a positive half float rounding to an even integer', () => {
    expect(halfEven(1.5)).toBe(2);
  });
  it('rounds to nearest even integer with a positive half float rounding to an odd integer', () => {
    expect(halfEven(2.5)).toBe(2);
  });
  it('rounds to nearest even integer with a negative half float', () => {
    expect(halfEven(-2.5)).toBe(-2);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfEven(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfEven(-1.6)).toBe(-2);
  });
});

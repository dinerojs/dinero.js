import { power } from '../power';

describe('power', () => {
  it('raises a positive number to the power of an exponent', () => {
    expect(power(2, 3)).toBe(8);
  });
  it('raises a negative number to the power of an exponent', () => {
    expect(power(-2, 3)).toBe(-8);
  });
  it('raises a float to the power of an exponent', () => {
    expect(power(1.5, 3)).toBe(3.375);
  });
  it('raises a number in scientific notation to the power of an exponent', () => {
    expect(power(1e5, 3)).toBe(1000000000000000);
  });
});

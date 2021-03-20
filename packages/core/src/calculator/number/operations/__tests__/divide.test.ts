import { divide } from '../divide';

describe('divide', () => {
  it('divides positive numbers', () => {
    expect(divide(8, 2)).toBe(4);
  });
  it('divides negative numbers', () => {
    expect(divide(-8, -2)).toBe(4);
  });
  it('divides floats', () => {
    expect(divide(10.5, 2.5)).toBe(4.2);
  });
  it('divides numbers in scientific notation', () => {
    expect(divide(3e5, 2e5)).toBe(1.5);
  });
});

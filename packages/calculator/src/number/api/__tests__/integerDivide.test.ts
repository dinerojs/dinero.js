import { integerDivide } from '../integerDivide';

describe('integerDivide', () => {
  it('divides positive numbers', () => {
    expect(integerDivide(8, 2)).toBe(4);
  });
  it('divides negative numbers', () => {
    expect(integerDivide(-8, -2)).toBe(4);
  });
  it('divides floats', () => {
    expect(integerDivide(10.5, 2.5)).toBe(4);
  });
  it('divides numbers in scientific notation', () => {
    expect(integerDivide(3e5, 2e5)).toBe(1);
  });
  it('rounds positive numbers towards zero', () => {
    expect(integerDivide(3, 2)).toBe(1);
  });
  it('rounds negative numbers towards zero', () => {
    expect(integerDivide(-3, 2)).toBe(-1);
  });
});

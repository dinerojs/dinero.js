import { integerDivide } from '../integerDivide';

describe('integerDivide', () => {
  it('divides positive numbers', () => {
    expect(integerDivide(8n, 2n)).toBe(4n);
  });
  it('divides negative numbers', () => {
    expect(integerDivide(-8n, -2n)).toBe(4n);
  });
  it('rounds positive numbers towards zero', () => {
    expect(integerDivide(3n, 2n)).toBe(1n);
  });
  it('rounds negative numbers towards zero', () => {
    expect(integerDivide(-3n, 2n)).toBe(-1n);
  });
});

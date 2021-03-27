import { halfTowardsZero } from '../halfTowardsZero';

describe('halfTowardsZero', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfTowardsZero(1.4)).toBe(1);
  });
  it('rounds up with a negative float below half', () => {
    expect(halfTowardsZero(-1.4)).toBe(-1);
  });
  it('rounds to the nearest integer towards zero with a positive half float', () => {
    expect(halfTowardsZero(1.5)).toBe(1);
  });
  it('rounds to the nearest integer towards zero with a negative half float', () => {
    expect(halfTowardsZero(-2.5)).toBe(-2);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfTowardsZero(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfTowardsZero(-1.6)).toBe(-2);
  });
});

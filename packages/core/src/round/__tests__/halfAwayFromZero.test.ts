import { halfAwayFromZero } from '../halfAwayFromZero';

describe('halfAwayFromZero', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfAwayFromZero(1.4)).toBe(1);
  });
  it('rounds up with a negative float below half', () => {
    expect(halfAwayFromZero(-1.4)).toBe(-1);
  });
  it('rounds to the nearest integer away from zero with a positive half float', () => {
    expect(halfAwayFromZero(1.5)).toBe(2);
  });
  it('rounds to the nearest integer away from zero with a negative half float', () => {
    expect(halfAwayFromZero(-2.5)).toBe(-3);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfAwayFromZero(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfAwayFromZero(-1.6)).toBe(-2);
  });
});

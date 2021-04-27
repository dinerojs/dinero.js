import { halfUp } from '../halfUp';

describe('halfUp', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfUp(1.4)).toBe(1);
  });
  it('rounds down with a negative float below half', () => {
    expect(halfUp(-1.4)).toBe(-1);
  });
  it('rounds up with a positive half float', () => {
    expect(halfUp(1.5)).toBe(2);
  });
  it('rounds up with a negative half float', () => {
    expect(halfUp(-2.5)).toBe(-2);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfUp(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfUp(-1.6)).toBe(-2);
  });
});

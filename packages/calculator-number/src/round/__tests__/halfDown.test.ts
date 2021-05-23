import { halfDown } from '../halfDown';

describe('halfDown', () => {
  it('rounds down with a positive float below half', () => {
    expect(halfDown(1.4)).toBe(1);
  });
  it('rounds down with a negative float below half', () => {
    expect(halfDown(-1.4)).toBe(-1);
  });
  it('rounds down with a positive half float', () => {
    expect(halfDown(1.5)).toBe(1);
  });
  it('rounds down with a negative half float', () => {
    expect(halfDown(-1.5)).toBe(-2);
  });
  it('rounds up with a positive float above half', () => {
    expect(halfDown(1.6)).toBe(2);
  });
  it('rounds down with a negative float above half', () => {
    expect(halfDown(-1.6)).toBe(-2);
  });
});

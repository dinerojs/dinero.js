import { up } from '../up';

describe('up', () => {
  it('rounds up with a positive float below half', () => {
    expect(up(1.4)).toBe(2);
  });
  it('rounds up with a negative float below half', () => {
    expect(up(-1.4)).toBe(-1);
  });
  it('rounds up with a positive half float', () => {
    expect(up(1.5)).toBe(2);
  });
  it('rounds up with a negative half float', () => {
    expect(up(-1.5)).toBe(-1);
  });
  it('rounds up with a positive float above half', () => {
    expect(up(1.6)).toBe(2);
  });
  it('rounds up with a negative float above half', () => {
    expect(up(-1.6)).toBe(-1);
  });
});

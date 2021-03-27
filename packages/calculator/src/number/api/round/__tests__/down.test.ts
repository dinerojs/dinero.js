import { down } from '../down';

describe('down', () => {
  it('rounds down with a positive float below half', () => {
    expect(down(1.4)).toBe(1);
  });
  it('rounds down with a negative float below half', () => {
    expect(down(-1.4)).toBe(-2);
  });
  it('rounds down with a positive half float', () => {
    expect(down(1.5)).toBe(1);
  });
  it('rounds down with a negative half float', () => {
    expect(down(-1.5)).toBe(-2);
  });
  it('rounds down with a positive float above half', () => {
    expect(down(1.6)).toBe(1);
  });
  it('rounds down with a negative float above half', () => {
    expect(down(-1.6)).toBe(-2);
  });
});

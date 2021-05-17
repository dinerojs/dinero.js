import { add } from '../add';

describe('add', () => {
  it('adds up positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  it('adds up negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
  it('adds up floats', () => {
    expect(add(1.5, 2.5)).toBe(4);
  });
  it('adds up numbers in scientific notation', () => {
    expect(add(1e5, 2e5)).toBe(300000);
  });
});

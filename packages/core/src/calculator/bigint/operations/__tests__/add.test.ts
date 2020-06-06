import add from '../add';

describe('add', () => {
  it('adds up positive numbers', () => {
    expect(add(1n, 2n, 3n)).toBe(6n);
  });
  it('adds up negative numbers', () => {
    expect(add(-1n, -2n, -3n)).toBe(-6n);
  });
});

import minimum from '../minimum';

describe('minimum', () => {
  it('gets the lowest from positive numbers', () => {
    expect(minimum(5n, 3n, 2n)).toBe(2n);
  });
  it('gets the lowest from negative numbers', () => {
    expect(minimum(-5n, -4n, -2n)).toBe(-5n);
  });
});

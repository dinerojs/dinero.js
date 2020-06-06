import multiply from '../multiply';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(10n, 20n, 30n)).toBe(6000n);
  });
  it('multiplies negative numbers', () => {
    expect(multiply(-10n, -20n, -30n)).toBe(-6000n);
  });
});

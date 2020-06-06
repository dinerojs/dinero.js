import countFractionDigits from '../countFractionDigits';

describe('countFractionDigits', () => {
  it('returns the right amount with floats', () => {
    expect(countFractionDigits(8.61)).toBe(2);
  });
  it('returns 0 with integers', () => {
    expect(countFractionDigits(8)).toBe(0);
  });
  it('returns the right amount with numbers in scientific notation', () => {
    expect(countFractionDigits(1e-7)).toBe(7);
  });
  it('returns the right amount with small numbers in scientific notation', () => {
    expect(countFractionDigits(1e-15)).toBe(15);
  });
});

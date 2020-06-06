import percentage from '../percentage';

describe('percentage', () => {
  it('calculates the percentage of a positive number', () => {
    expect(percentage(200n, 50n)).toBe(100n);
  });
  it('calculates the percentage of a negative number', () => {
    expect(percentage(-200n, 50n)).toBe(-100n);
  });
});

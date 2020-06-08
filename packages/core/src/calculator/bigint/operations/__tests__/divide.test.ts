import divide from '../divide';

describe('divide', () => {
  it('divides positive numbers', () => {
    expect(divide(8n, 2n)).toBe(4n);
  });
  it('divides negative numbers', () => {
    expect(divide(-8n, -2n)).toBe(4n);
  });
});

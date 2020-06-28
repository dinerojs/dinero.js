import isOfType from '../isOfType';

describe('isOfType', () => {
  it('returns true with positive bigints', () => {
    expect(isOfType(1n)).toBe(true);
  });
  it('returns true with negative bigints', () => {
    expect(isOfType(-1n)).toBe(true);
  });
});

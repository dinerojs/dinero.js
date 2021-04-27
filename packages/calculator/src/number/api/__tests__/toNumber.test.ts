import { toNumber } from '../toNumber';

describe('toNumber', () => {
  it('returns the input', () => {
    expect(toNumber(2)).toBe(2);
  });
});

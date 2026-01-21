import { zero } from '../zero.js';

describe('zero', () => {
  it('returns zero as bigint', () => {
    expect(zero()).toBe(0n);
  });
});
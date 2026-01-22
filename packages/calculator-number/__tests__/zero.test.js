import { zero } from '../lib/es6/src/api/zero.js';

describe('zero', () => {
  it('returns zero', () => {
    expect(zero()).toBe(0);
  });
});
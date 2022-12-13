import BN from 'bn.js';

import { increment } from '../increment';

describe('increment', () => {
  it('increments positive numbers', () => {
    expect(increment(new BN(2))).toEqual(new BN(3));
  });
  it('increments negative numbers', () => {
    expect(increment(new BN(-2))).toEqual(new BN(-1));
  });
});

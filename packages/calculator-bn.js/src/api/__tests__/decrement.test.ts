import BN from 'bn.js';

import { decrement } from '../decrement';

describe('decrement', () => {
  it('decrements positive numbers', () => {
    expect(decrement(new BN(2))).toEqual(new BN(1));
  });
  it('decrements negative numbers', () => {
    expect(decrement(new BN(-2))).toEqual(new BN(-3));
  });
});

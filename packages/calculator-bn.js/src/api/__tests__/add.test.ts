import BN from 'bn.js';

import { add } from '../add';

describe('add', () => {
  it('adds up positive numbers', () => {
    expect(add(new BN(2), new BN(3))).toEqual(new BN(5));
  });
  it('adds up negative numbers', () => {
    expect(add(new BN(-1), new BN(-2))).toEqual(new BN(-3));
  });
});

import BN from 'bn.js';

import { multiply } from '../multiply';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(new BN(10), new BN(20))).toEqual(new BN(200));
  });
  it('multiplies negative numbers', () => {
    expect(multiply(new BN(-10), new BN(-20))).toEqual(new BN(200));
  });
});

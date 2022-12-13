import BN from 'bn.js';

import { power } from '../power';

describe('power', () => {
  it('raises a positive number to the power of an exponent', () => {
    expect(power(new BN(2), new BN(3))).toEqual(new BN(8));
  });
  it('raises a negative number to the power of an exponent', () => {
    expect(power(new BN(-2), new BN(3))).toEqual(new BN(-8));
  });
});

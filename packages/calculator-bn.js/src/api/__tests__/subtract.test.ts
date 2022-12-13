import BN from 'bn.js';

import { subtract } from '../subtract';

describe('subtract', () => {
  it('subtracts positive numbers', () => {
    expect(subtract(new BN(1), new BN(2))).toEqual(new BN(-1));
  });
  it('subtracts negative numbers', () => {
    expect(subtract(new BN(-1), new BN(-2))).toEqual(new BN(1));
  });
});

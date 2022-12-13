import BN from 'bn.js';

import { modulo } from '../modulo';

describe('modulo', () => {
  it('performs a modulo with positive numbers', () => {
    expect(modulo(new BN(5), new BN(3))).toEqual(new BN(2));
  });
  it('performs a modulo with negative numbers', () => {
    expect(modulo(new BN(-5), new BN(-4))).toEqual(new BN(-1));
  });
});

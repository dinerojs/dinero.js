import BN from 'bn.js';

import { zero } from '../zero';

describe('zero', () => {
  it('returns zero', () => {
    expect(zero()).toEqual(new BN(0));
  });
});

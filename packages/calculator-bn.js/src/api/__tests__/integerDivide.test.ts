import BN from 'bn.js';

import { integerDivide } from '../integerDivide';

describe('integerDivide', () => {
  it('divides positive numbers', () => {
    expect(integerDivide(new BN(8), new BN(2))).toEqual(new BN(4));
  });
  it('divides negative numbers', () => {
    expect(integerDivide(new BN(-8), new BN(-2))).toEqual(new BN(4));
  });
  it('rounds positive numbers towards zero', () => {
    expect(integerDivide(new BN(3), new BN(2))).toEqual(new BN(1));
  });
  it('rounds negative numbers towards zero', () => {
    expect(integerDivide(new BN(-3), new BN(2))).toEqual(new BN(-1));
  });
});

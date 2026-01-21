import { calculator } from '@dinero.js/calculator-number';

import { computeBase as createComputeBase, fromValue } from '../computeBase';

const computeBase = createComputeBase(calculator);

describe('computeBase', () => {
  it('returns non-array values as is', () => {
    expect(computeBase(fromValue(100))).toBe(100);
  });
  it('computes array values', () => {
    expect(computeBase(fromValue([20, 12, 7]))).toBe(1680);
  });
});

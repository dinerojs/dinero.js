import { calculator } from '@dinero.js/calculator-number';
import { EUR } from '@dinero.js/currencies';
import { dinero } from 'dinero.js';

import { toSnapshot } from '../toSnapshot';
import { trimScale } from '../trimScale';

const trim = trimScale(calculator);
describe('trimScale', () => {
  it('should not crash on 0 amounts', () => {
    const result = trim(dinero({ amount: 0, currency: EUR }));
    expect(toSnapshot(result)).toEqual({ amount: 0, scale: 2, currency: EUR });
  });
  it('should calculate scale correctly', () => {
    const result = trim(
      dinero({ amount: 100000000, scale: 10, currency: EUR })
    );
    expect(toSnapshot(result)).toEqual({ amount: 1, scale: 2, currency: EUR });
  });
});

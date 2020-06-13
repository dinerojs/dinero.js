import { USD } from '@dinero.js/currencies';
import { Dinero, hasSubUnits } from '../../../..';

describe('hasSubUnits', () => {
  it('returns false when there are no sub-units', () => {
    const d = Dinero({ amount: 1100, currency: USD });

    expect(hasSubUnits(d)).toBe(false);
  });
  it('returns true when there are sub-units based on a custom scale', () => {
    const d = Dinero({ amount: 1100, currency: USD, scale: 3 });

    expect(hasSubUnits(d)).toBe(true);
  });
  it('returns true when there are sub-units', () => {
    const d = Dinero({ amount: 1150, currency: USD });

    expect(hasSubUnits(d)).toBe(true);
  });
  it('returns false when there are no sub-units based on a custom scale', () => {
    const d = Dinero({ amount: 1150, currency: USD, scale: 1 });

    expect(hasSubUnits(d)).toBe(false);
  });
});

import { USD } from '@dinero.js/currencies';
import { Dinero, toRoundedUnit } from '../../..';

describe('toRoundedUnit', () => {
  it('returns the amount in currency unit, rounded to one fraction digit', () => {
    const d = Dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, 1)).toBe(10.6);
  });
  it('returns the negative amount in currency unit, rounded to one fraction digit', () => {
    const d = Dinero({ amount: -1055, currency: USD });

    expect(toRoundedUnit(d, 1)).toBe(-10.6);
  });
  it('returns the amount in currency unit, rounded to one fraction digit', () => {
    const d = Dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, 2)).toBe(10.55);
  });
  it('returns the amount in currency unit, rounded to no fraction digit', () => {
    const d = Dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, 0)).toBe(11);
  });
});

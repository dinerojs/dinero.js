import { down } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';
import { dinero, toRoundedUnit } from '../../..';

describe('toRoundedUnit', () => {
  it('returns the amount in currency unit, rounded to one fraction digit', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, { digits: 1, round: down })).toBe(10.5);
  });
  it('returns the negative amount in currency unit, rounded to one fraction digit', () => {
    const d = dinero({ amount: -1055, currency: USD });

    expect(toRoundedUnit(d, { digits: 1, round: down })).toBe(-10.6);
  });
  it('returns the amount in currency unit, rounded to two fraction digits', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, { digits: 2, round: down })).toBe(10.55);
  });
  it('returns the amount in currency unit, rounded to no fraction digit', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toRoundedUnit(d, { digits: 0, round: down })).toBe(10);
  });
});

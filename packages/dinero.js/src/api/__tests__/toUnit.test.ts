import { down } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';

import { toUnit } from '..';
import { dinero } from '../..';

describe('toUnit', () => {
  it('returns the amount in currency unit', () => {
    const d = dinero({ amount: 1050, currency: USD });

    expect(toUnit(d)).toBe(10.5);
  });
  it('returns the amount in currency unit, based on a custom scale', () => {
    const d = dinero({ amount: 10545, currency: USD, scale: 3 });

    expect(toUnit(d)).toBe(10.545);
  });
  it('returns the amount in currency unit, rounded to one fraction digit', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toUnit(d, { digits: 1, round: down })).toBe(10.5);
  });
  it('returns the negative amount in currency unit, rounded to one fraction digit', () => {
    const d = dinero({ amount: -1055, currency: USD });

    expect(toUnit(d, { digits: 1, round: down })).toBe(-10.6);
  });
  it('returns the amount in currency unit, rounded to two fraction digits', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toUnit(d, { digits: 2, round: down })).toBe(10.55);
  });
  it('returns the amount in currency unit, rounded to no fraction digit', () => {
    const d = dinero({ amount: 1055, currency: USD });

    expect(toUnit(d, { digits: 0, round: down })).toBe(10);
  });
});

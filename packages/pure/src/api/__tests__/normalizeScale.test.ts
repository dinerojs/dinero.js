import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, normalizeScale } from '../../..';

describe('normalizeScale', () => {
  it('returns an array of pure Dinero objects with normalized scale and converted amount', () => {
    const d1 = dinero({ amount: 100, currency: USD, scale: 2 });
    const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

    const normalized = normalizeScale([d1, d2]);
    const [firstSnapshot, secondSnapshot] = normalized.map((d) => {
      const { amount, scale } = toSnapshot(d);

      return { amount, scale };
    });

    expect(firstSnapshot.amount && secondSnapshot.amount).toBe(1000);
    expect(firstSnapshot.scale && secondSnapshot.scale).toBe(3);
  });
});

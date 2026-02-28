import type { Dinero } from '../types';

export function toSnapshot<TAmount, TCurrency extends string>(
  dineroObject: Dinero<TAmount, TCurrency>
) {
  return dineroObject.toJSON();
}

import type { Dinero, DineroSnapshot } from '../types';

export function toSnapshot<TAmount>(
  dineroObject: Dinero<TAmount>
): DineroSnapshot<TAmount> {
  return dineroObject.toJSON();
}

import type { Dinero } from '../types';

export function toSnapshot<TAmount>(dineroObject: Dinero<TAmount>) {
  return dineroObject.toJSON();
}

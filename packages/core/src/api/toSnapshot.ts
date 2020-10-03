import { BaseDinero } from '../types';

export function toSnapshot<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroObject: TDinero
) {
  return dineroObject.toJSON();
}

import { Dinero } from '../types';

export function toSnapshot<TAmount, TDinero extends Dinero<TAmount>>(
  dineroObject: TDinero
) {
  return dineroObject.toJSON();
}

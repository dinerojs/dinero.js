import { BaseDinero } from '../types';

function toSnapshot<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroObject: TDinero
) {
  return dineroObject.toJSON();
}

export default toSnapshot;

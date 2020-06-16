import { ChainableDinero } from '../types';

function toSnapshot<TType>(dineroObject: ChainableDinero<TType>) {
  return {
    amount: dineroObject.getAmount(),
    currency: dineroObject.getCurrency(),
    scale: dineroObject.getScale(),
  };
}

export default toSnapshot;

import { ChainableDinero } from '../types';

function toSnapshot<TAmountType>(dineroObject: ChainableDinero<TAmountType>) {
  return {
    amount: dineroObject.getAmount(),
    currency: dineroObject.getCurrency(),
    scale: dineroObject.getScale(),
  };
}

export default toSnapshot;

import { ChainableDinero } from '../types';

function hasSameCurrency<TAmountType>(
  dineroObject: ChainableDinero<TAmountType>,
  comparator: ChainableDinero<TAmountType>
) {
  return dineroObject.getCurrency() === comparator.getCurrency();
}

export default hasSameCurrency;

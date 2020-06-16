import { ChainableDinero } from '../types';

function hasSameCurrency<TType>(
  dineroObject: ChainableDinero<TType>,
  comparator: ChainableDinero<TType>
) {
  return dineroObject.getCurrency() === comparator.getCurrency();
}

export default hasSameCurrency;

import { ChainableDinero } from '../types';

function equalsTo<TAmountType>(
  dineroObject: ChainableDinero<TAmountType>,
  comparator: ChainableDinero<TAmountType>
) {
  return (
    dineroObject.hasSameAmount(comparator) &&
    dineroObject.hasSameCurrency(comparator)
  );
}

export default equalsTo;

import { ChainableDinero } from '../types';

function equalsTo<TType>(
  dineroObject: ChainableDinero<TType>,
  comparator: ChainableDinero<TType>
) {
  return (
    dineroObject.hasSameAmount(comparator) &&
    dineroObject.hasSameCurrency(comparator)
  );
}

export default equalsTo;

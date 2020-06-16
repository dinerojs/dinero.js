import { ChainableDinero, Calculator } from '../types';
import normalizeScale from './normalizeScale';

function hasSameAmount<TType>(calculator: Calculator<TType>) {
  return (
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) => {
    const [d1, d2] = normalizeScale(calculator)(dineroObject, comparator);

    return d1.getAmount() === d2.getAmount();
  };
}

export default hasSameAmount;

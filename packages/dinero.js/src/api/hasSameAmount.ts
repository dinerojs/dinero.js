import { ChainableDinero, Calculator } from '../types';
import normalizeScale from './normalizeScale';

function hasSameAmount<TAmountType>(calculator: Calculator<TAmountType>) {
  return (
    dineroObject: ChainableDinero<TAmountType>,
    comparator: ChainableDinero<TAmountType>
  ) => {
    const [d1, d2] = normalizeScale(calculator)(dineroObject, comparator);

    return d1.getAmount() === d2.getAmount();
  };
}

export default hasSameAmount;

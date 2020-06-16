import { ChainableDinero, Calculator } from '../types';
import { normalizeScale } from '.';

function greaterThan<TAmountType>(calculator: Calculator<TAmountType>) {
  return (
    dineroObject: ChainableDinero<TAmountType>,
    comparator: ChainableDinero<TAmountType>
  ) => {
    const [d1, d2] = normalizeScale(calculator)(dineroObject, comparator);

    return calculator.greaterThan(d1.getAmount(), d2.getAmount());
  };
}

export default greaterThan;

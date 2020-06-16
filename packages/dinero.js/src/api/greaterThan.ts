import { ChainableDinero, Calculator } from '../types';
import { normalizeScale } from '.';

function greaterThan<TType>(calculator: Calculator<TType>) {
  return (
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) => {
    const [d1, d2] = normalizeScale(calculator)(dineroObject, comparator);

    return calculator.greaterThan(d1.getAmount(), d2.getAmount());
  };
}

export default greaterThan;

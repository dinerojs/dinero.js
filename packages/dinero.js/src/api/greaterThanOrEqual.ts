import { ChainableDinero, Calculator } from '../types';
import { normalizeScale } from '.';

function greaterThanOrEqual<TType>(calculator: Calculator<TType>) {
  return (
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) => {
    const [d1, d2] = normalizeScale(calculator)(dineroObject, comparator);

    return calculator.greaterThanOrEqual(d1.getAmount(), d2.getAmount());
  };
}

export default greaterThanOrEqual;

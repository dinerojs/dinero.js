import { ChainableDinero, Calculator } from '../types';

function isPositive<TType>(calculator: Calculator<TType>) {
  return (dineroObject: ChainableDinero<TType>) => {
    return calculator.greaterThanOrEqual(
      dineroObject.getAmount(),
      calculator.zero()
    );
  };
}

export default isPositive;

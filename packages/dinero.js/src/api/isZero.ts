import { ChainableDinero, Calculator } from '../types';

function isZero<TType>(calculator: Calculator<TType>) {
  return (dineroObject: ChainableDinero<TType>) => {
    return calculator.areEqual(dineroObject.getAmount(), calculator.zero());
  };
}

export default isZero;

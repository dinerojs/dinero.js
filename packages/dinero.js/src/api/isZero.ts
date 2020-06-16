import { ChainableDinero, Calculator } from '../types';

function isZero<TAmountType>(calculator: Calculator<TAmountType>) {
  return (dineroObject: ChainableDinero<TAmountType>) => {
    return calculator.areEqual(dineroObject.getAmount(), calculator.zero());
  };
}

export default isZero;

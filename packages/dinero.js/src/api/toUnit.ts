import { ChainableDinero, Calculator } from '../types';

function toUnit<TAmountType>(calculator: Calculator<TAmountType>) {
  return (dineroObject: ChainableDinero<TAmountType>) => {
    return calculator.divide(
      dineroObject.getAmount(),
      calculator.power(dineroObject.getCurrency().base, dineroObject.getScale())
    );
  };
}

export default toUnit;

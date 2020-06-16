import { ChainableDinero, Calculator } from '../types';

function toUnit<TType>(calculator: Calculator<TType>) {
  return (dineroObject: ChainableDinero<TType>) => {
    return calculator.divide(
      dineroObject.getAmount(),
      calculator.power(dineroObject.getCurrency().base, dineroObject.getScale())
    );
  };
}

export default toUnit;

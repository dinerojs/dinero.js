import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function subtract<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (
    minuend: ChainableDinero<TType>,
    subtrahend: ChainableDinero<TType>
  ) => {
    return dineroFactory({
      amount: calculator.subtract(minuend.getAmount(), subtrahend.getAmount()),
      currency: minuend.getCurrency(),
      scale: minuend.getScale(),
    });
  };
}

export default subtract;

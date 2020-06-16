import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function subtract<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (
    minuend: ChainableDinero<TAmountType>,
    subtrahend: ChainableDinero<TAmountType>
  ) => {
    return dineroFactory({
      amount: calculator.subtract(minuend.getAmount(), subtrahend.getAmount()),
      currency: minuend.getCurrency(),
      scale: minuend.getScale(),
    });
  };
}

export default subtract;

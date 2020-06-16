import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function percentage<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (dineroObject: ChainableDinero<TAmountType>, share: TAmountType) => {
    return dineroFactory({
      amount: calculator.percentage(dineroObject.getAmount(), share),
      currency: dineroObject.getCurrency(),
      scale: dineroObject.getScale(),
    });
  };
}

export default percentage;

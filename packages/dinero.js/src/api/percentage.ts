import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function percentage<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (dineroObject: ChainableDinero<TType>, share: TType) => {
    return dineroFactory({
      amount: calculator.percentage(dineroObject.getAmount(), share),
      currency: dineroObject.getCurrency(),
      scale: dineroObject.getScale(),
    });
  };
}

export default percentage;

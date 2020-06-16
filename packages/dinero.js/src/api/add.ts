import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function add<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (augend: ChainableDinero<TType>, addend: ChainableDinero<TType>) => {
    return dineroFactory({
      amount: calculator.add(augend.getAmount(), addend.getAmount()),
      currency: augend.getCurrency(),
      scale: augend.getScale(),
    });
  };
}

export default add;

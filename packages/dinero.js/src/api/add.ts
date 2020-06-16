import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function add<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (augend: ChainableDinero<TAmountType>, addend: ChainableDinero<TAmountType>) => {
    return dineroFactory({
      amount: calculator.add(augend.getAmount(), addend.getAmount()),
      currency: augend.getCurrency(),
      scale: augend.getScale(),
    });
  };
}

export default add;

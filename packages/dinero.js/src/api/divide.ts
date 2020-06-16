import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function divide<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (
    dividend: ChainableDinero<TType>,
    divisor: TType,
    roundingMode: RoundingMode<TType>
  ) => {
    return dineroFactory({
      amount: roundingMode(calculator.divide(dividend.getAmount(), divisor)),
      currency: dividend.getCurrency(),
      scale: dividend.getScale(),
    });
  };
}

export default divide;

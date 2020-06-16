import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function divide<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (
    dividend: ChainableDinero<TAmountType>,
    divisor: TAmountType,
    roundingMode: RoundingMode<TAmountType>
  ) => {
    return dineroFactory({
      amount: roundingMode(calculator.divide(dividend.getAmount(), divisor)),
      currency: dividend.getCurrency(),
      scale: dividend.getScale(),
    });
  };
}

export default divide;

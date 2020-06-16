import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function multiply<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (
    multiplier: ChainableDinero<TAmountType>,
    multiplicand: TAmountType,
    roundingMode: RoundingMode<TAmountType>
  ) => {
    return dineroFactory({
      amount: roundingMode(
        calculator.multiply(multiplier.getAmount(), multiplicand)
      ),
      currency: multiplier.getCurrency(),
      scale: multiplier.getScale(),
    });
  };
}

export default multiply;

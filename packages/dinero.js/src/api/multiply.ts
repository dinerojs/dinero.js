import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function multiply<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (
    multiplier: ChainableDinero<TType>,
    multiplicand: TType,
    roundingMode: RoundingMode<TType>
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

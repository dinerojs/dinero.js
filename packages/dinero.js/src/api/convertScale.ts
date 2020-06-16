import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function convertScale<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (
    dineroObject: ChainableDinero<TType>,
    newScale: TType,
    roundingMode: RoundingMode<TType>
  ) => {
    const currency = dineroObject.getCurrency();

    return dineroFactory({
      amount: roundingMode(
        calculator.multiply(
          dineroObject.getAmount(),
          calculator.power(
            currency.base,
            calculator.subtract(newScale, dineroObject.getScale())
          )
        )
      ),
      currency,
      scale: newScale,
    });
  };
}

export default convertScale;

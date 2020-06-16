import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function convertScale<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (
    dineroObject: ChainableDinero<TAmountType>,
    newScale: TAmountType,
    roundingMode: RoundingMode<TAmountType>
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

import { RoundingMode, DineroOptions, Rates } from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';
import { ChainableDinero, Calculator } from '../types';

function convert<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return async (
    dineroObject: ChainableDinero<TAmountType>,
    newCurrency: Currency<TAmountType>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Rates<TAmountType>;
      readonly roundingMode: RoundingMode<TAmountType>;
    }
  ) => {
    const r = await rates;
    const rate = r[newCurrency.code];

    return dineroFactory({
      amount: roundingMode(calculator.multiply(dineroObject.getAmount(), rate)),
      currency: newCurrency,
      scale: dineroObject.getScale(),
    });
  };
}

export default convert;

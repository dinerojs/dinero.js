import { RoundingMode, DineroOptions, Rates } from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';
import { ChainableDinero, Calculator } from '../types';

function convert<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return async (
    dineroObject: ChainableDinero<TType>,
    newCurrency: Currency<TType>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Rates<TType>;
      readonly roundingMode: RoundingMode<TType>;
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

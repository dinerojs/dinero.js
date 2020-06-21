import { Currency } from '@dinero.js/currencies';
import { Calculator, RoundingMode } from '../calculator';
import { DineroOptions, BaseDinero, Rates } from '../types';

function convert<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<Calculator<TAmount>, 'multiply'>
) {
  return async (
    dineroObject: TDinero,
    newCurrency: Currency<TAmount>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Readonly<Promise<Rates<TAmount>>>;
      readonly roundingMode: RoundingMode<TAmount>;
    }
  ) => {
    const r = await rates;
    const rate = r[newCurrency.code];

    const { amount, scale } = dineroObject.toJSON();

    return dineroFactory({
      amount: roundingMode(calculator.multiply(amount, rate)),
      currency: newCurrency,
      scale,
    });
  };
}

export default convert;

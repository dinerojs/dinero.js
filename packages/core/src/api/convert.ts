import { Currency } from '@dinero.js/currencies';
import { Calculator, RoundingMode } from '../calculator';
import { BaseDinero, Rates, DineroFactory } from '../types';

type ConvertOptions<TAmount> = {
  readonly rates: Readonly<Promise<Rates<TAmount>>>;
  readonly roundingMode: RoundingMode<TAmount>;
  readonly preserveScale?: boolean;
};

function convert<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'multiply' | 'round'>
) {
  return async (
    dineroObject: TDinero,
    newCurrency: Currency<TAmount>,
    {
      rates,
      roundingMode = calculator.round,
      preserveScale = true,
    }: ConvertOptions<TAmount>
  ) => {
    const r = await rates;
    const rate = r[newCurrency.code];

    const { amount, scale: sourceScale } = dineroObject.toJSON();

    return dineroFactory({
      amount: roundingMode(calculator.multiply(amount, rate)),
      currency: newCurrency,
      scale: preserveScale ? sourceScale : newCurrency.exponent,
    });
  };
}

export default convert;

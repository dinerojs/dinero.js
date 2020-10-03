import { Currency } from '@dinero.js/currencies';
import { RoundingMode } from '../calculator';
import { BaseDinero, Rates } from '../types';
import { Dependencies } from './types';

type ConvertOptions<TAmount> = {
  readonly rates: Readonly<Promise<Rates<TAmount>>>;
  readonly roundingMode: RoundingMode<TAmount>;
  readonly preserveScale?: boolean;
};

export function convert<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'multiply' | 'round'>) {
  return async function _convert(
    dineroObject: TDinero,
    newCurrency: Currency<TAmount>,
    {
      rates,
      roundingMode = calculator.round,
      preserveScale = true,
    }: ConvertOptions<TAmount>
  ) {
    const r = await rates;
    const rate = r[newCurrency.code];

    const { amount, scale: sourceScale } = dineroObject.toJSON();

    return factory({
      amount: roundingMode(calculator.multiply(amount, rate)),
      currency: newCurrency,
      scale: preserveScale ? sourceScale : newCurrency.exponent,
    });
  };
}

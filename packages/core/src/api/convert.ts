import { Currency } from '@dinero.js/currencies';
import { RoundingMode } from '@dinero.js/calculator';
import { Dinero, Rates } from '../types';
import { Dependencies } from './types';

type ConvertOptions<TAmount> = {
  readonly rates: Readonly<Promise<Rates<TAmount>>>;
  readonly roundingMode: RoundingMode<TAmount>;
  readonly preserveScale?: boolean;
};

export type ConvertDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'multiply' | 'round'>;

export function convert<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: ConvertDependencies<TAmount, TDinero>) {
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

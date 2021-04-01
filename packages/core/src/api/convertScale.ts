import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

export type ConvertScaleDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'subtract' | 'multiply' | 'power' | 'round'>;

export function convertScale<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: ConvertScaleDependencies<TAmount, TDinero>) {
  return function _convertScale(
    dineroObject: TDinero,
    newScale: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(
      currency.base,
      calculator.subtract(newScale, scale)
    );

    return factory({
      amount: roundingMode(calculator.multiply(amount, factor)),
      currency,
      scale: newScale,
    });
  };
}

import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

export type ConvertScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract' | 'multiply' | 'power' | 'round'
>;

export function convertScale<TAmount>({
  calculator,
}: ConvertScaleDependencies<TAmount>) {
  return function _convertScale(
    dineroObject: Dinero<TAmount>,
    newScale: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(
      currency.base,
      calculator.subtract(newScale, scale)
    );

    return dineroObject.create({
      amount: roundingMode(calculator.multiply(amount, factor)),
      currency,
      scale: newScale,
    });
  };
}

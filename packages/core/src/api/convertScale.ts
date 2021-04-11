import type { RoundingMode } from '@dinero.js/calculator';
import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type ConvertScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount,
  roundingMode?: RoundingMode<TAmount>
];

export type ConvertScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract' | 'multiply' | 'power' | 'round'
>;

export function convertScale<TAmount>({
  calculator,
}: ConvertScaleDependencies<TAmount>) {
  return function _convertScale(
    ...[
      dineroObject,
      newScale,
      roundingMode = calculator.round,
    ]: ConvertScaleParams<TAmount>
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

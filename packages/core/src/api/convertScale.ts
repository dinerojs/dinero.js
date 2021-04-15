import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type ConvertScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount,
];

export type ConvertScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract' | 'multiply' | 'power' | 'modulo' | 'zero' | 'increment'
>;

export function convertScale<TAmount>({
  calculator,
}: ConvertScaleDependencies<TAmount>) {
  return function _convertScale(
    ...[
      dineroObject,
      newScale,
    ]: ConvertScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    const zero = calculator.zero();
    const one = calculator.increment(zero);
    const factor = calculator.power(
      currency.base,
      calculator.subtract(newScale, scale)
    );
    const rawQuotient = calculator.multiply(amount, factor);
    const quotient = calculator.subtract(rawQuotient, calculator.modulo(rawQuotient, one));

    return dineroObject.create({
      amount: quotient,
      currency,
      scale: newScale,
    });
  };
}

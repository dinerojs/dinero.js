import { RoundingMode } from '../calculator';
import { BaseDinero } from '../types';
import { Dependencies } from './types';

export function convertScale<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'subtract' | 'multiply' | 'power' | 'round'
>) {
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

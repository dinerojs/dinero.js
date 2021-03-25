import { RoundingMode } from '../calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

export function convertScale<TAmount, TDinero extends Dinero<TAmount>>({
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

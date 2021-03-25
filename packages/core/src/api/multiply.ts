import { RoundingMode } from '../calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

export function multiply<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'multiply' | 'round'>) {
  return function _multiply(
    multiplier: TDinero,
    multiplicand: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { amount, currency, scale } = multiplier.toJSON();

    return factory({
      amount: roundingMode(calculator.multiply(amount, multiplicand)),
      currency,
      scale,
    });
  };
}

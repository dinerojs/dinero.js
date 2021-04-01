import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

type DivideDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'divide' | 'round'>;

export function divide<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: DivideDependencies<TAmount, TDinero>) {
  return function _divide(
    dividend: TDinero,
    divisor: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { amount, currency, scale } = dividend.toJSON();

    return factory({
      amount: roundingMode(calculator.divide(amount, divisor)),
      currency,
      scale,
    });
  };
}

import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { Dependencies } from './types';

type DivideDependencies<TAmount> = Dependencies<TAmount, 'divide' | 'round'>;

export function divide<TAmount>({ calculator }: DivideDependencies<TAmount>) {
  return function _divide(
    dividend: Dinero<TAmount>,
    divisor: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { amount, currency, scale } = dividend.toJSON();

    return dividend.create({
      amount: roundingMode(calculator.divide(amount, divisor)),
      currency,
      scale,
    });
  };
}

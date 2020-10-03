/* eslint-disable functional/no-expression-statement */
import { BaseDinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export function unsafeSubtract<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'subtract'>) {
  return function subtract(minuend: TDinero, subtrahend: TDinero) {
    const { amount: minuendAmount, currency, scale } = minuend.toJSON();
    const { amount: subtrahendAmount } = subtrahend.toJSON();

    const amount = calculator.subtract(minuendAmount, subtrahendAmount);

    return factory({
      amount,
      currency,
      scale,
    });
  };
}

export function safeSubtract<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  | 'subtract'
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'round'
  | 'subtract'
  | 'zero'
>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const subtractFn = unsafeSubtract({ factory, calculator });

  return function subtract(minuend: TDinero, subtrahend: TDinero) {
    assertSameCurrency(haveSameCurrency([minuend, subtrahend]));

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

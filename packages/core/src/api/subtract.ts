/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeSubtractDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract'
>;

export function unsafeSubtract<TAmount>({
  calculator,
}: UnsafeSubtractDependencies<TAmount>) {
  return function subtract(
    minuend: Dinero<TAmount>,
    subtrahend: Dinero<TAmount>
  ) {
    const { amount: minuendAmount, currency, scale } = minuend.toJSON();
    const { amount: subtrahendAmount } = subtrahend.toJSON();

    const amount = calculator.subtract(minuendAmount, subtrahendAmount);

    return minuend.create({
      amount,
      currency,
      scale,
    });
  };
}

export type SafeSubtractDependencies<TAmount> = Dependencies<
  TAmount,
  | 'subtract'
  | 'add'
  | 'compare'
  | 'multiply'
  | 'power'
  | 'round'
  | 'subtract'
  | 'zero'
>;

export function safeSubtract<TAmount>({
  calculator,
}: SafeSubtractDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const subtractFn = unsafeSubtract({ calculator });

  return function subtract(
    minuend: Dinero<TAmount>,
    subtrahend: Dinero<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([minuend, subtrahend]));

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

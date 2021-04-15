/* eslint-disable functional/no-expression-statement */
import type { Dinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import type { Dependencies } from './types';

export type SubtractParams<TAmount> = readonly [
  minuend: Dinero<TAmount>,
  subtrahend: Dinero<TAmount>
];

export type UnsafeSubtractDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract'
>;

export function unsafeSubtract<TAmount>({
  calculator,
}: UnsafeSubtractDependencies<TAmount>) {
  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
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
  | 'subtract'
  | 'zero'
  | 'integerDivide'
>;

export function safeSubtract<TAmount>({
  calculator,
}: SafeSubtractDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const subtractFn = unsafeSubtract({ calculator });

  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
    assertSameCurrency(haveSameCurrency([minuend, subtrahend]));

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

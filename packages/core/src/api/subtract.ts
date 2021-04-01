/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeSubtractDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'subtract'>;

export function unsafeSubtract<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: UnsafeSubtractDependencies<TAmount, TDinero>) {
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

export type SafeSubtractDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
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
>;

export function safeSubtract<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: SafeSubtractDependencies<TAmount, TDinero>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const subtractFn = unsafeSubtract({ factory, calculator });

  return function subtract(minuend: TDinero, subtrahend: TDinero) {
    assertSameCurrency(haveSameCurrency([minuend, subtrahend]));

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type SubtractParams<TAmount> = readonly [
  minuend: Dinero<TAmount>,
  subtrahend: Dinero<TAmount>
];

export type UnsafeSubtractDependencies<TAmount> = Dependencies<TAmount>;

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

export type SafeSubtractDependencies<TAmount> = Dependencies<TAmount>;

export function safeSubtract<TAmount>({
  calculator,
}: SafeSubtractDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const subtractFn = unsafeSubtract({ calculator });

  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
    const condition = haveSameCurrency([minuend, subtrahend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

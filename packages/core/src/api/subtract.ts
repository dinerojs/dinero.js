/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero } from '../types';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type SubtractParams<TAmount> = readonly [
  minuend: Dinero<TAmount>,
  subtrahend: Dinero<TAmount>
];

function unsafeSubtract<TAmount>(calculator: Calculator<TAmount>) {
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

export function safeSubtract<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const subtractFn = unsafeSubtract(calculator);

  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
    const condition = haveSameCurrency([minuend, subtrahend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

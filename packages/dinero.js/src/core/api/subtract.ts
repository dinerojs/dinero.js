import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type SubtractParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  minuend: Dinero<TAmount, TCurrency>,
  subtrahend: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeSubtract<TAmount>(calculator: DineroCalculator<TAmount>) {
  return function subtract<TCurrency extends string>(
    ...[minuend, subtrahend]: SubtractParams<TAmount, TCurrency>
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

export function safeSubtract<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const subtractFn = unsafeSubtract(calculator);

  return function subtract<TCurrency extends string>(
    ...[minuend, subtrahend]: SubtractParams<TAmount, TCurrency>
  ) {
    const condition = haveSameCurrency([minuend, subtrahend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newMinuend, newSubtrahend] = normalizeFn([minuend, subtrahend]);

    return subtractFn(newMinuend, newSubtrahend);
  };
}

import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero } from '../types';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type AddParams<TAmount, TCurrency extends string = string> = readonly [
  augend: Dinero<TAmount, TCurrency>,
  addend: Dinero<TAmount, NoInfer<TCurrency>>,
];

function unsafeAdd<TAmount>(calculator: DineroCalculator<TAmount>) {
  return function add<TCurrency extends string>(
    ...[augend, addend]: AddParams<TAmount, TCurrency>
  ) {
    const { amount: augendAmount, currency, scale } = augend.toJSON();
    const { amount: addendAmount } = addend.toJSON();

    const amount = calculator.add(augendAmount, addendAmount);

    return augend.create({
      amount,
      currency,
      scale,
    });
  };
}

export function safeAdd<TAmount>(calculator: DineroCalculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const addFn = unsafeAdd(calculator);

  return function add<TCurrency extends string>(
    ...[augend, addend]: AddParams<TAmount, TCurrency>
  ) {
    const condition = haveSameCurrency([augend, addend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newAugend, newAddend] = normalizeFn([augend, addend]);

    return addFn(newAugend, newAddend);
  };
}

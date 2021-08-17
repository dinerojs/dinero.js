/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { Calculator, Dinero } from '../types';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

export type AddParams<TAmount> = readonly [
  augend: Dinero<TAmount>,
  addend: Dinero<TAmount>
];

function unsafeAdd<TAmount>(calculator: Calculator<TAmount>) {
  return function add(...[augend, addend]: AddParams<TAmount>) {
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

export function safeAdd<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const addFn = unsafeAdd(calculator);

  return function add(...[augend, addend]: AddParams<TAmount>) {
    const condition = haveSameCurrency([augend, addend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newAugend, newAddend] = normalizeFn([augend, addend]);

    return addFn(newAugend, newAddend);
  };
}

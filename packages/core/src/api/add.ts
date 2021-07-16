/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';

import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type AddParams<TAmount> = readonly [
  augend: Dinero<TAmount>,
  addend: Dinero<TAmount>
];

export type UnsafeAddDependencies<TAmount> = Dependencies<TAmount>;

export function unsafeAdd<TAmount>({
  calculator,
}: UnsafeAddDependencies<TAmount>) {
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

export type SafeAddDependencies<TAmount> = Dependencies<TAmount>;

export function safeAdd<TAmount>({ calculator }: SafeAddDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const addFn = unsafeAdd({ calculator });

  return function add(...[augend, addend]: AddParams<TAmount>) {
    const condition = haveSameCurrency([augend, addend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const [newAugend, newAddend] = normalizeFn([augend, addend]);

    return addFn(newAugend, newAddend);
  };
}

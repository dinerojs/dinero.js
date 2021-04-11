/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeAddDependencies<TAmount> = Dependencies<TAmount, 'add'>;

export function unsafeAdd<TAmount>({
  calculator,
}: UnsafeAddDependencies<TAmount>) {
  return function add(augend: Dinero<TAmount>, addend: Dinero<TAmount>) {
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

export type SafeAddDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeAdd<TAmount>({ calculator }: SafeAddDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const addFn = unsafeAdd({ calculator });

  return function add(augend: Dinero<TAmount>, addend: Dinero<TAmount>) {
    assertSameCurrency(haveSameCurrency([augend, addend]));

    const [newAugend, newAddend] = normalizeFn([augend, addend]);

    return addFn(newAugend, newAddend);
  };
}

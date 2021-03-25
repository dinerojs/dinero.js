/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export function unsafeAdd<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'add'>) {
  return function add(augend: TDinero, addend: TDinero) {
    const { amount: augendAmount, currency, scale } = augend.toJSON();
    const { amount: addendAmount } = addend.toJSON();

    const amount = calculator.add(augendAmount, addendAmount);

    return factory({
      amount,
      currency,
      scale,
    });
  };
}

export function safeAdd<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const addFn = unsafeAdd({ factory, calculator });

  return function add(augend: TDinero, addend: TDinero) {
    assertSameCurrency(haveSameCurrency([augend, addend]));

    const [newAugend, newAddend] = normalizeFn([augend, addend]);

    return addFn(newAugend, newAddend);
  };
}

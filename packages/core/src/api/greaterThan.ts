/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { greaterThan as gt } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeGreaterThanDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare'>;

export function unsafeGreaterThan<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: UnsafeGreaterThanDependencies<TAmount, TDinero>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan(dineroObject: TDinero, comparator: TDinero) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

export type SafeGreaterThanDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeGreaterThan<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: SafeGreaterThanDependencies<TAmount, TDinero>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const greaterThanFn = unsafeGreaterThan({ factory, calculator });

  return function greaterThan(dineroObject: TDinero, comparator: TDinero) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

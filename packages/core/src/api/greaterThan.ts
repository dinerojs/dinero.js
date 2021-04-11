/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { greaterThan as gt } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeGreaterThanDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeGreaterThan<TAmount>({
  calculator,
}: UnsafeGreaterThanDependencies<TAmount>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

export type SafeGreaterThanDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeGreaterThan<TAmount>({
  calculator,
}: SafeGreaterThanDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const greaterThanFn = unsafeGreaterThan({ calculator });

  return function greaterThan(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

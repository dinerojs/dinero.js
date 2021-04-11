/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { greaterThanOrEqual as gte } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeGreaterThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeGreaterThanOrEqual<TAmount>({
  calculator,
}: UnsafeGreaterThanOrEqualDependencies<TAmount>) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export type SafeGreaterThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeGreaterThanOrEqual<TAmount>({
  calculator,
}: SafeGreaterThanOrEqualDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual({
    calculator,
  });

  return function greaterThanOrEqual(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

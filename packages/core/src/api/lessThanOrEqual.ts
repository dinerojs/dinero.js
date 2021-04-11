/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { lessThanOrEqual as lte } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeLessThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeLessThanOrEqual<TAmount>({
  calculator,
}: UnsafeLessThanOrEqualDependencies<TAmount>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export type SafeLessThanOrEqualDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeLessThanOrEqual<TAmount>({
  calculator,
}: SafeLessThanOrEqualDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const lessThanOrEqualFn = unsafeLessThanOrEqual({
    calculator,
  });

  return function lessThanOrEqual(
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

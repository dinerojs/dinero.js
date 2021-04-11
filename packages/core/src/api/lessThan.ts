/* eslint-disable functional/no-expression-statement */
import type { Dinero } from '../types';
import { lessThan as lt } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import type { Dependencies } from './types';
import { assertSameCurrency } from '../guards';

export type LessThanParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeLessThanDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeLessThan<TAmount>({
  calculator,
}: UnsafeLessThanDependencies<TAmount>) {
  const lessThanFn = lt(calculator);

  return function lessThan(
    ...[dineroObject, comparator]: LessThanParams<TAmount>
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}

export type SafeLessThanDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeLessThan<TAmount>({
  calculator,
}: SafeLessThanDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const lessThanFn = unsafeLessThan({ calculator });

  return function lessThan(
    ...[dineroObject, comparator]: LessThanParams<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}

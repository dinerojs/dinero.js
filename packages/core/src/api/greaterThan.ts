/* eslint-disable functional/no-expression-statement */
import { assertSameCurrency } from '../guards';
import type { Dinero } from '../types';
import { greaterThan as gt } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import type { Dependencies } from './types';

export type GreaterThanParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  comparator: Dinero<TAmount>
];

export type UnsafeGreaterThanDependencies<TAmount> = Dependencies<
  TAmount,
  'compare'
>;

export function unsafeGreaterThan<TAmount>({
  calculator,
}: UnsafeGreaterThanDependencies<TAmount>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount>
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
  'add' | 'compare' | 'multiply' | 'power' | 'subtract' | 'zero' | 'integerDivide'
>;

export function safeGreaterThan<TAmount>({
  calculator,
}: SafeGreaterThanDependencies<TAmount>) {
  const normalizeFn = normalizeScale({ calculator });
  const greaterThanFn = unsafeGreaterThan({ calculator });

  return function greaterThan(
    ...[dineroObject, comparator]: GreaterThanParams<TAmount>
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}

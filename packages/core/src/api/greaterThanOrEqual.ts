/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { greaterThanOrEqual as gte } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export type UnsafeGreaterThanOrEqualDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare'>;

export function unsafeGreaterThanOrEqual<
  TAmount,
  TDinero extends Dinero<TAmount>
>({ calculator }: UnsafeGreaterThanOrEqualDependencies<TAmount, TDinero>) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual(
    dineroObject: TDinero,
    comparator: TDinero
  ) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export type SafeGreaterThanOrEqualDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeGreaterThanOrEqual<
  TAmount,
  TDinero extends Dinero<TAmount>
>({
  factory,
  calculator,
}: SafeGreaterThanOrEqualDependencies<TAmount, TDinero>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual({
    factory,
    calculator,
  });

  return function greaterThanOrEqual(
    dineroObject: TDinero,
    comparator: TDinero
  ) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

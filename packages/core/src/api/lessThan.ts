/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { lessThan as lt } from '../utils';
import { haveSameCurrency, normalizeScale } from '.';
import { Dependencies } from './types';
import { assertSameCurrency } from '../guards';

export type UnsafeLessThanDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'compare'>;

export function unsafeLessThan<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: UnsafeLessThanDependencies<TAmount, TDinero>) {
  const lessThanFn = lt(calculator);

  return function lessThan(dineroObject: TDinero, comparator: TDinero) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}

export type SafeLessThanDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function safeLessThan<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: SafeLessThanDependencies<TAmount, TDinero>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const lessThanFn = unsafeLessThan({ factory, calculator });

  return function lessThan(dineroObject: TDinero, comparator: TDinero) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanFn(subjectAmount, comparatorAmount);
  };
}

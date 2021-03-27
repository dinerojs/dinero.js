/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { lessThanOrEqual as lte } from '../calculator/helpers';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export function unsafeLessThanOrEqual<
  TAmount,
  TDinero extends Dinero<TAmount>
>({ calculator }: Dependencies<TAmount, TDinero, 'compare'>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual(dineroObject: TDinero, comparator: TDinero) {
    const dineroObjects = [dineroObject, comparator];

    const [subjectAmount, comparatorAmount] = dineroObjects.map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

export function safeLessThanOrEqual<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
  const normalizeFn = normalizeScale({ factory, calculator });
  const lessThanOrEqualFn = unsafeLessThanOrEqual({
    factory,
    calculator,
  });

  return function lessThanOrEqual(dineroObject: TDinero, comparator: TDinero) {
    assertSameCurrency(haveSameCurrency([dineroObject, comparator]));

    const [subjectAmount, comparatorAmount] = normalizeFn([
      dineroObject,
      comparator,
    ]);

    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}

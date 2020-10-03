/* eslint-disable functional/no-expression-statement */
import { BaseDinero } from '../types';
import { greaterThanOrEqual as gte } from '../calculator/helpers';
import { haveSameCurrency, normalizeScale } from '.';
import { assertSameCurrency } from '../guards';
import { Dependencies } from './types';

export function unsafeGreaterThanOrEqual<
  TAmount,
  TDinero extends BaseDinero<TAmount>
>({ calculator }: Dependencies<TAmount, TDinero, 'compare'>) {
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

export function safeGreaterThanOrEqual<
  TAmount,
  TDinero extends BaseDinero<TAmount>
>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
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

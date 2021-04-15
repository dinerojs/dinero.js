/* eslint-disable functional/no-expression-statement */
import type { Dinero } from '../types';
import { distribute, greaterThanOrEqual, greaterThan } from '../utils';
import type { Dependencies } from './types';
import { assertValidRatios } from '../guards';

export type AllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: readonly TAmount[]
];

export type UnsafeAllocateDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'integerDivide'
  | 'increment'
  | 'decrement'
  | 'multiply'
  | 'subtract'
  | 'zero'
  | 'modulo'
>;

export function unsafeAllocate<TAmount>({
  calculator,
}: UnsafeAllocateDependencies<TAmount>) {
  return function allocate(...[dineroObject, ratios]: AllocateParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const shares = distribute(calculator)(amount, ratios);

    return shares.map((share) => {
      return dineroObject.create({
        amount: share,
        currency,
        scale,
      });
    });
  };
}

export type SafeAllocateDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'compare'
  | 'integerDivide'
  | 'increment'
  | 'decrement'
  | 'multiply'
  | 'subtract'
  | 'zero'
  | 'modulo'
>;

export function safeAllocate<TAmount>({
  calculator,
}: SafeAllocateDependencies<TAmount>) {
  const allocateFn = unsafeAllocate({ calculator });
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);

  return function allocate(...[dineroObject, ratios]: AllocateParams<TAmount>) {
    const condition =
      ratios.length > 0 &&
      ratios.every((ratio) => greaterThanOrEqualFn(ratio, calculator.zero())) &&
      ratios.some((ratio) => greaterThanFn(ratio, calculator.zero()));

    assertValidRatios(condition);

    return allocateFn(dineroObject, ratios);
  };
}

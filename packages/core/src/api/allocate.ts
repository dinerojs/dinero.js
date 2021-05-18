/* eslint-disable functional/no-expression-statement */
import { assertValidRatios } from '../guards';
import { distribute, greaterThan, greaterThanOrEqual } from '../utils';

import { transformScale } from './transformScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type AllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: readonly TAmount[],
  options?: AllocateOptions<TAmount>
];

export type AllocateOptions<TAmount> = {
  readonly scale: TAmount;
};

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
  | 'power'
>;

export function safeAllocate<TAmount>({
  calculator,
}: SafeAllocateDependencies<TAmount>) {
  const allocateFn = unsafeAllocate({ calculator });
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);
  const convertScaleFn = transformScale({ calculator });

  return function allocate(
    ...[
      dineroObject,
      ratios,
      options = { scale: calculator.zero() },
    ]: AllocateParams<TAmount>
  ) {
    const zero = calculator.zero();

    const hasRatios = ratios.length > 0;
    const hasOnlyPositiveRatios = ratios.every((ratio) =>
      greaterThanOrEqualFn(ratio, zero)
    );
    const hasOneNonZeroRatio = ratios.some((ratio) =>
      greaterThanFn(ratio, zero)
    );

    assertValidRatios(hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio);

    const { scale } = dineroObject.toJSON();
    const newScale = calculator.add(scale, options.scale);

    return allocateFn(convertScaleFn(dineroObject, newScale), ratios);
  };
}

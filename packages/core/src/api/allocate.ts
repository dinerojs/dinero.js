/* eslint-disable functional/no-expression-statement */
import { INVALID_RATIOS_MESSAGE } from '../checks';
import { assert } from '../helpers';
import {
  distribute,
  equal,
  greaterThan,
  greaterThanOrEqual,
  isScaledAmount,
  maximum,
} from '../utils';

import { transformScale } from './transformScale';

import type { Dinero, ScaledAmount } from '../types';
import type { Dependencies } from './types';

type UnsafeAllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: ReadonlyArray<ScaledAmount<TAmount>>
];

export type AllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: ReadonlyArray<ScaledAmount<TAmount> | TAmount>
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

function unsafeAllocate<TAmount>({
  calculator,
}: UnsafeAllocateDependencies<TAmount>) {
  return function allocate(
    ...[dineroObject, ratios]: UnsafeAllocateParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const distributeFn = distribute(calculator);
    const shares = distributeFn(
      amount,
      ratios.map((ratio) => ratio.amount)
    );

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
  const maximumFn = maximum(calculator);
  const equalFn = equal(calculator);

  return function allocate(...[dineroObject, ratios]: AllocateParams<TAmount>) {
    const zero = calculator.zero();
    const ten = new Array(10)
      .fill(null)
      .reduce((acc) => calculator.increment(acc), zero);

    const hasRatios = ratios.length > 0;
    const highestRatioScale = hasRatios
      ? maximumFn(
          ratios.map((ratio) => {
            return isScaledAmount(ratio) ? ratio?.scale ?? zero : zero;
          })
        )
      : zero;
    const normalizedRatios = ratios.map((ratio) => {
      const ratioAmount = isScaledAmount(ratio) ? ratio.amount : ratio;
      const ratioScale = isScaledAmount(ratio) ? ratio?.scale ?? zero : zero;

      const factor = equalFn(ratioScale, highestRatioScale)
          ? zero
          : calculator.subtract(highestRatioScale, ratioScale);

      return {
        amount: calculator.multiply(ratioAmount, calculator.power(ten, factor)),
        scale: ratioScale,
      };
    });
    const hasOnlyPositiveRatios = normalizedRatios.every(({ amount }) =>
      greaterThanOrEqualFn(amount, zero)
    );
    const hasOneNonZeroRatio = normalizedRatios.some(({ amount }) =>
      greaterThanFn(amount, zero)
    );

    const condition = hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio;
    assert(condition, INVALID_RATIOS_MESSAGE);

    const { scale } = dineroObject.toJSON();
    const newScale = calculator.add(scale, highestRatioScale);

    return allocateFn(convertScaleFn(dineroObject, newScale), normalizedRatios);
  };
}

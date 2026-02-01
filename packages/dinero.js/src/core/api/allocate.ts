import { INVALID_RATIOS_MESSAGE } from '../checks';
import { assert } from '../helpers';
import type { DineroCalculator, Dinero, DineroScaledAmount } from '../types';
import {
  distribute,
  equal,
  getAmountAndScale,
  greaterThan,
  greaterThanOrEqual,
  maximum,
} from '../utils';

import { transformScale } from './transformScale';

type UnsafeAllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: ReadonlyArray<DineroScaledAmount<TAmount>>,
];

function unsafeAllocate<TAmount>(calculator: DineroCalculator<TAmount>) {
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

export type AllocateParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  ratios: ReadonlyArray<DineroScaledAmount<TAmount> | TAmount>,
];

export function safeAllocate<TAmount>(calculator: DineroCalculator<TAmount>) {
  const allocateFn = unsafeAllocate(calculator);
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);
  const convertScaleFn = transformScale(calculator);
  const maximumFn = maximum(calculator);
  const equalFn = equal(calculator);
  const zero = calculator.zero();
  const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

  return function allocate(...[dineroObject, ratios]: AllocateParams<TAmount>) {
    const hasRatios = ratios.length > 0;
    const scaledRatios = ratios.map((ratio) => getAmountAndScale(ratio, zero));
    const highestRatioScale = hasRatios
      ? maximumFn(scaledRatios.map(({ scale }) => scale))
      : zero;
    const normalizedRatios = scaledRatios.map(({ amount, scale }) => {
      const factor = equalFn(scale, highestRatioScale)
        ? zero
        : calculator.subtract(highestRatioScale, scale);

      return {
        amount: calculator.multiply(amount, calculator.power(ten, factor)),
        scale,
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

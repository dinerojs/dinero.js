import type { DineroCalculator, Dinero } from '../types';
import { computeBase, countTrailingZeros, equal, maximum } from '../utils';

import { transformScale } from './transformScale';

export type TrimScaleParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [dineroObject: Dinero<TAmount, TCurrency>];

export function trimScale<TAmount>(calculator: DineroCalculator<TAmount>) {
  const countTrailingZerosFn = countTrailingZeros(calculator);
  const equalFn = equal(calculator);
  const maximumFn = maximum(calculator);
  const transformScaleFn = transformScale(calculator);
  const computeBaseFn = computeBase(calculator);

  return function trimScaleFn<TCurrency extends string>(
    ...[dineroObject]: TrimScaleParams<TAmount, TCurrency>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const base = computeBaseFn(currency.base);

    const trailingZerosLength = countTrailingZerosFn(amount, base);
    const difference = calculator.subtract(scale, trailingZerosLength);
    const newScale = maximumFn([difference, currency.exponent]);

    if (equalFn(newScale, scale)) {
      return dineroObject;
    }

    return transformScaleFn(dineroObject, newScale);
  };
}

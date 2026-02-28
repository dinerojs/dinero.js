import type { DineroCalculator, Dinero } from '../types';
import { equal, maximum } from '../utils';

import { transformScale } from './transformScale';

export type NormalizeScaleParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObjects: readonly [
    Dinero<TAmount, TCurrency>,
    ...Dinero<TAmount, NoInfer<TCurrency>>[],
  ],
];

export function normalizeScale<TAmount>(calculator: DineroCalculator<TAmount>) {
  const maximumFn = maximum(calculator);
  const convertScaleFn = transformScale(calculator);
  const equalFn = equal(calculator);

  return function _normalizeScale<TCurrency extends string>(
    ...[dineroObjects]: NormalizeScaleParams<TAmount, TCurrency>
  ) {
    const highestScale = dineroObjects.reduce((highest, current) => {
      const { scale } = current.toJSON();

      return maximumFn([highest, scale]);
    }, calculator.zero());

    return dineroObjects.map((d) => {
      const { scale } = d.toJSON();

      return !equalFn(scale, highestScale)
        ? convertScaleFn(d, highestScale)
        : d;
    });
  };
}

import type { Calculator, Dinero } from '../types';
import { equal, maximum } from '../utils';

import { transformScale } from './transformScale';

export type NormalizeScaleParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export function normalizeScale<TAmount>(calculator: Calculator<TAmount>) {
  const maximumFn = maximum(calculator);
  const convertScaleFn = transformScale(calculator);
  const equalFn = equal(calculator);

  return function _normalizeScale(
    ...[dineroObjects]: NormalizeScaleParams<TAmount>
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

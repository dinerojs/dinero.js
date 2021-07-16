import { greaterThan } from '../utils';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type TransformScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount
];

export type TransformScaleDependencies<TAmount> = Dependencies<TAmount>;

export function transformScale<TAmount>({
  calculator,
}: TransformScaleDependencies<TAmount>) {
  const greaterThanFn = greaterThan(calculator);

  return function transformScaleFn(
    ...[dineroObject, newScale]: TransformScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    const isNewScaleLarger = greaterThanFn(newScale, scale);
    const operation = isNewScaleLarger
      ? calculator.multiply
      : calculator.integerDivide;
    const terms = isNewScaleLarger
      ? ([newScale, scale] as const)
      : ([scale, newScale] as const);

    const factor = calculator.power(
      currency.base,
      calculator.subtract(...terms)
    );

    return dineroObject.create({
      amount: operation(amount, factor),
      currency,
      scale: newScale,
    });
  };
}

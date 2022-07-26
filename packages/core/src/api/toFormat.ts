import type { Calculator, Dinero, Transformer } from '../types';

import { toUnit } from './toUnit';

export type ToFormatParams<TAmount, TResult = string> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount, TResult>
];

export function toFormat<TAmount, TResult = string>(
  calculator: Calculator<TAmount>
) {
  const toUnitFn = toUnit(calculator);

  return function toFormatFn(
    ...[dineroObject, transformer]: ToFormatParams<TAmount, TResult>
  ) {
    const { currency, scale } = dineroObject.toJSON();
    const amount = toUnitFn(dineroObject, { digits: scale });

    return transformer({ amount, currency, dineroObject });
  };
}

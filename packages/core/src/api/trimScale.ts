import { countTrailingZeros, equal, maximum } from '../utils';

import { transformScale } from './transformScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type TrimScaleParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export type TrimScaleDependencies<TAmount> = Dependencies<
  TAmount,
  | 'compare'
  | 'increment'
  | 'integerDivide'
  | 'modulo'
  | 'power'
  | 'subtract'
  | 'zero'
  | 'multiply'
>;

export function trimScale<TAmount>({
  calculator,
}: TrimScaleDependencies<TAmount>) {
  const countTrailingZerosFn = countTrailingZeros(calculator);
  const equalFn = equal(calculator);
  const maximumFn = maximum(calculator);
  const transformScaleFn = transformScale({ calculator });

  return function trimScaleFn(...[dineroObject]: TrimScaleParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const { base, exponent } = currency;

    const trailingZerosLength = countTrailingZerosFn(amount, base);
    const difference = calculator.subtract(scale, trailingZerosLength);
    const newScale = maximumFn([difference, exponent]);

    if (equalFn(newScale, scale)) {
      return dineroObject;
    }

    return transformScaleFn(dineroObject, newScale);
  };
}

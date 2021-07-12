import { toRoundedUnit } from './toRoundedUnit';

import type { Dinero, Transformer } from '../types';
import type { Dependencies } from './types';

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>
];

export type ToFormatDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'power' | 'toNumber'
>;

export function toFormat<TAmount>({
  calculator,
}: ToFormatDependencies<TAmount>) {
  const toRoundedUnitFn = toRoundedUnit({ calculator });

  return function toFormatFn(
    ...[dineroObject, transformer]: ToFormatParams<TAmount>
  ) {
    const { currency, scale } = dineroObject.toJSON();

    const amount = toRoundedUnitFn(dineroObject, { digits: scale });

    return transformer({ amount, currency, dineroObject });
  };
}

import { toRoundedUnit } from './toRoundedUnit';

import type { Dinero, RoundingOptions, Transformer } from '../types';
import type { Dependencies } from './types';

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>,
  options?: RoundingOptions<TAmount>
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
    ...[dineroObject, transformer, options = {}]: ToFormatParams<TAmount>
  ) {
    const { currency } = dineroObject.toJSON();

    const amount = toRoundedUnitFn(dineroObject, options);

    return transformer({ amount, currency, dineroObject });
  };
}

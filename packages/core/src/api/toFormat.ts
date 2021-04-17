import type { Dinero, Transformer, RoundingOptions } from '../types';
import { toRoundedUnit } from './toRoundedUnit';
import type { Dependencies } from './types';

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>,
  options: RoundingOptions<TAmount>
];

export type ToFormatDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power'
>;

export function toFormat<TAmount>({
  calculator,
}: ToFormatDependencies<TAmount>) {
  const toRoundedUnitFn = toRoundedUnit({ calculator });

  return function _toFormat(
    ...[
      dineroObject,
      transformer,
      { digits, roundingMode } = {} as RoundingOptions<TAmount>,
    ]: ToFormatParams<TAmount>
  ) {
    const { currency } = dineroObject.toJSON();

    const amount = toRoundedUnitFn(
      dineroObject,
      { digits, roundingMode },
    );

    return transformer({ amount, currency });
  };
}

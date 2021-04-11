import type { Dinero, Transformer, FormatOptions } from '../types';
import { toRoundedUnit } from './toRoundedUnit';
import type { Dependencies } from './types';

export type ToFormatParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount>,
  options: FormatOptions<TAmount>
];

export type ToFormatDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power' | 'round'
>;

export function toFormat<TAmount>({
  calculator,
}: ToFormatDependencies<TAmount>) {
  const toRoundedUnitFn = toRoundedUnit({ calculator });

  return function _toFormat(
    ...[
      dineroObject,
      transformer,
      { digits, roundingMode } = {} as FormatOptions<TAmount>,
    ]: ToFormatParams<TAmount>
  ) {
    const { currency } = dineroObject.toJSON();

    const amount = toRoundedUnitFn(
      dineroObject,
      digits || currency.exponent,
      roundingMode || calculator.round
    );

    return transformer({ amount, currency });
  };
}

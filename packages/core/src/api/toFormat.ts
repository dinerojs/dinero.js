import { Dinero, Transformer, FormatOptions } from '../types';
import { toRoundedUnit } from './toRoundedUnit';
import { Dependencies } from './types';

export type ToFormatDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power' | 'round'
>;

export function toFormat<TAmount>({
  calculator,
}: ToFormatDependencies<TAmount>) {
  const toRoundedUnitFn = toRoundedUnit({ calculator });

  return function _toFormat(
    dineroObject: Dinero<TAmount>,
    transformer: Transformer<TAmount>,
    { digits, roundingMode }: FormatOptions<TAmount>
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

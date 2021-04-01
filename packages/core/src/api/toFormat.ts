import { Dinero, Transformer, FormatOptions } from '../types';
import { toRoundedUnit } from './toRoundedUnit';
import { Dependencies } from './types';

export type ToFormatDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'multiply' | 'divide' | 'power' | 'round'>;

export function toFormat<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: ToFormatDependencies<TAmount, TDinero>) {
  const toRoundedUnitFn = toRoundedUnit({ factory, calculator });

  return function _toFormat(
    dineroObject: TDinero,
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

import { Dinero } from '../types';
import { Transformer, FormatOptions } from '../formatter';
import { toRoundedUnit } from './toRoundedUnit';
import { Dependencies } from './types';

export function toFormat<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'multiply' | 'divide' | 'power' | 'round'>) {
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

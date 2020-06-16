import { Transformer, FormatOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';
import toRoundedUnit from './toRoundedUnit';

function toFormat<TAmountType>(calculator: Calculator<TAmountType>) {
  return (
    dineroObject: ChainableDinero<TAmountType>,
    transformer: Transformer<TAmountType>,
    { digits, roundingMode }: FormatOptions<TAmountType>
  ) => {
    const currency = dineroObject.getCurrency();
    const amount = toRoundedUnit(calculator)(
      dineroObject,
      digits || currency.exponent,
      roundingMode || calculator.round
    );

    return transformer({ amount, currency });
  };
}

export default toFormat;

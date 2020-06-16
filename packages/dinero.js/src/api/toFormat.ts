import { Transformer, FormatOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';
import toRoundedUnit from './toRoundedUnit';

function toFormat<TType>(calculator: Calculator<TType>) {
  return (
    dineroObject: ChainableDinero<TType>,
    transformer: Transformer<TType>,
    { digits, roundingMode }: FormatOptions<TType>
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

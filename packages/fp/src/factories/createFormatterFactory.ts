import { Transformer, Formatter, RoundingMode } from '@dinero.js/core';
import { FunctionalDinero, toSnapshot } from '../..';

type FormatOptions<TAmountType> = {
  readonly digits?: TAmountType;
  readonly roundingMode?: RoundingMode<TAmountType>;
};

/**
 * Create a formatter factory function.
 *
 * @param amountTransformer An amount transformer function.
 *
 * @returns A formatter factory function.
 */
function createFormatterFactory<TAmountType>(
  amountTransformer: (
    functionalDinero: FunctionalDinero<TAmountType>,
    digits: TAmountType,
    roundingMode?: RoundingMode<TAmountType>
  ) => TAmountType
) {
  return (
    transformer: Transformer<TAmountType>,
    { digits, roundingMode }: FormatOptions<TAmountType> = {}
  ): Formatter<TAmountType> => {
    return (d: FunctionalDinero<TAmountType>) => {
      const { currency } = toSnapshot(d);
      const amount = amountTransformer(
        d,
        digits || currency.exponent,
        roundingMode
      );

      return transformer({ amount, currency });
    };
  };
}

export default createFormatterFactory;

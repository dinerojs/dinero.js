import { Transformer, Formatter, RoundingMode } from '@dinero.js/core';
import { FunctionalDinero, toSnapshot } from '../..';

type FormatOptions<TType> = {
  readonly digits?: TType;
  readonly roundingMode?: RoundingMode<TType>;
};

/**
 * Create a formatter factory function.
 *
 * @param amountTransformer An amount transformer function.
 *
 * @returns A formatter factory function.
 */
function createFormatterFactory<TType>(
  amountTransformer: (
    functionalDinero: FunctionalDinero<TType>,
    digits: TType,
    roundingMode?: RoundingMode<TType>
  ) => TType
) {
  return (
    transformer: Transformer<TType>,
    { digits, roundingMode }: FormatOptions<TType> = {}
  ): Formatter<TType> => {
    return (d: FunctionalDinero<TType>) => {
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

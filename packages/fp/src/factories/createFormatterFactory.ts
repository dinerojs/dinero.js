import { Transformer, RoundingMode } from '@dinero.js/core';
import { FunctionalDinero } from '@dinero.js/fp';

type FormatOptions<TType> = {
  readonly digits: TType;
  readonly roundingMode: RoundingMode<TType>;
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
  function createFormatter(
    transformer: Transformer<TType>,
    { digits, roundingMode }: FormatOptions<TType>
  ) {
    return (functionalDinero) => {
      const { currency } = functionalDinero.toJSON();
      const amount = amountTransformer(functionalDinero, digits, roundingMode);

      return transformer({ amount, currency });
    };
  }

  return createFormatter;
}

export default createFormatterFactory;

import { DineroSnapshot, Formatter } from "@dinero.js/core";

/**
 * Create a functional Dinero object.
 *
 * @param transformer A transformer function.
 *
 * @returns A formatter function.
 */
function createFormatter<TType>(
  transformer: ({ amount, currency, scale }: DineroSnapshot<TType>) => string
) {
  const formatter: Formatter<TType> = (functionalDinero) => {
    const { amount, currency, scale } = functionalDinero.toJSON();

    return transformer({ amount, currency, scale });
  };

  return formatter;
}

export default createFormatter;

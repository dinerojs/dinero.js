import { VariadicOperation } from "@dinero.js/core";
import { FunctionalDinero, createFunctionalDinero } from "@dinero.js/fp";

/**
 * Create variadic arithmetic operation functions.
 *
 * @param operation A variadic operation.
 *
 * @returns A variadic arithmetic operation function.
 */
function createVariadicOperation<TType>(operation: VariadicOperation<TType>) {
  const variadicOperation = (
    ...functionalDineros: FunctionalDinero<TType>[]
  ) => {
    const amount = functionalDineros
      .map((subject) => {
        const { amount } = subject.toJSON();

        return amount;
      })
      .reduce((acc, curr) => operation(acc, curr));

    const { currency, scale } = functionalDineros[0].toJSON();

    const d = createFunctionalDinero({
      amount,
      currency,
      scale,
    });

    return d;
  };

  return variadicOperation;
}

export default createVariadicOperation;

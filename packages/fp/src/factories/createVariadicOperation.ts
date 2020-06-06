import { VariadicOperation } from '@dinero.js/core';
import dinero, { FunctionalDinero } from '@dinero.js/fp';

/**
 * Create variadic arithmetic operation functions.
 *
 * @param operation A variadic operation.
 *
 * @returns A variadic arithmetic operation function.
 */
function createVariadicOperation<TType>(operation: VariadicOperation<TType>) {
  return (...functionalDineros: ReadonlyArray<FunctionalDinero<TType>>) => {
    const amount = functionalDineros
      .map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
      .reduce((acc, curr) => operation(acc, curr));

    const { currency, scale } = functionalDineros[0].toJSON();

    return dinero({
      amount,
      currency,
      scale,
    });
  };
}

export default createVariadicOperation;

import { VariadicOperation } from '@dinero.js/core';
import { FunctionalDinero } from '../..';
import { toSnapshot } from '../transformer';
import { Dinero } from '..';

/**
 * Create variadic arithmetic operation functions.
 *
 * @param operation A variadic operation.
 *
 * @returns A variadic arithmetic operation function.
 */
function createVariadicOperation<TType>(operation: VariadicOperation<TType>) {
  return (functionalDineros: ReadonlyArray<FunctionalDinero<TType>>) => {
    const amount = operation(
      functionalDineros.map((subject) => {
        const { amount: subjectAmount } = toSnapshot(subject);

        return subjectAmount;
      })
    );

    const { currency, scale } = toSnapshot(functionalDineros[0]);

    return Dinero({
      amount,
      currency,
      scale,
    });
  };
}

export default createVariadicOperation;

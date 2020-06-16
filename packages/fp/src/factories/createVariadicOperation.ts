import { VariadicOperation } from '@dinero.js/core';
import { FunctionalDinero } from '../..';
import { toSnapshot } from '../transformer';
import dinero from '../dinero';

/**
 * Create variadic arithmetic operation functions.
 *
 * @param operation A variadic operation.
 *
 * @returns A variadic arithmetic operation function.
 */
function createVariadicOperation<TAmountType>(operation: VariadicOperation<TAmountType>) {
  return (functionalDineros: ReadonlyArray<FunctionalDinero<TAmountType>>) => {
    const amount = operation(
      functionalDineros.map((subject) => {
        const { amount: subjectAmount } = toSnapshot(subject);

        return subjectAmount;
      })
    );

    const { currency, scale } = toSnapshot(functionalDineros[0]);

    return dinero({
      amount,
      currency,
      scale,
    });
  };
}

export default createVariadicOperation;

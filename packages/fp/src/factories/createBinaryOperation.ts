import { BinaryOperation } from '@dinero.js/core';
import { FunctionalDinero } from '../..';
import { toSnapshot } from '../transformer';
import dinero from '../dinero';

/**
 * Create binary arithmetic operation functions.
 *
 * @param operation A binary operation.
 *
 * @returns A binary arithmetic operation function.
 */
function createBinaryOperation<TType>(operation: BinaryOperation<TType>) {
  return (d1: FunctionalDinero<TType>, d2: FunctionalDinero<TType>) => {
    const amount = [d1, d2]
      .map((subject) => {
        const { amount: subjectAmount } = toSnapshot(subject);

        return subjectAmount;
      })
      .reduce((acc, curr) => operation(acc, curr));

    const { currency, scale } = toSnapshot(d1);

    return dinero({
      amount,
      currency,
      scale,
    });
  };
}

export default createBinaryOperation;

import { FunctionalDinero } from '../../..';

/**
 * Get a snapshot of a functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to transform.
 *
 * @returns A snapshot og the object.
 */
function toSnapshot<TAmountType>(functionalDinero: FunctionalDinero<TAmountType>) {
  return functionalDinero.toJSON();
}

export default toSnapshot;

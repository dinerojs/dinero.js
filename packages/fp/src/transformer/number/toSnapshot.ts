import { FunctionalDinero } from '../../..';

/**
 * Get a snapshot of a functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to transform.
 *
 * @returns A snapshot og the object.
 */
function toSnapshot<TType>(functionalDinero: FunctionalDinero<TType>) {
  return functionalDinero.toJSON();
}

export default toSnapshot;

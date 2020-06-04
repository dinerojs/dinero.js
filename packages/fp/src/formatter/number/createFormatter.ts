import { toRoundedUnit, createFormatterFactory } from "@dinero.js/fp";

/**
 * Create a functional Dinero object.
 *
 * @param transformer A transformer function.
 *
 * @returns A formatter function.
 */
const createFormatter = createFormatterFactory<number>(toRoundedUnit);

export default createFormatter;

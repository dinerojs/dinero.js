import { createFormatterFactory } from '../../factories';
import { toRoundedUnit } from '../../transformer';

/**
 * Create a functional Dinero object.
 *
 * @param transformer A transformer function.
 * @param formatOptions Formatting options for the amount transformer.
 *
 * @returns A formatter function.
 */
const createFormatter = createFormatterFactory<number>(toRoundedUnit);

export default createFormatter;

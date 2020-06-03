import { minimum as minimumNumbers } from "@dinero.js/core/calculator/number";
import { createVariadicOperation } from "@dinero.js/fp";

/**
 * Get the lowest of the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to minimum.
 *
 * @returns A new functional Dinero object.
 */
const minimum = createVariadicOperation(minimumNumbers);

export default minimum;

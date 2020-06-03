import { maximum as maximumNumbers } from "@dinero.js/core/calculator/number";
import { createVariadicOperation } from "@dinero.js/fp";

/**
 * Get the greatest of the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to maximum.
 *
 * @returns A new functional Dinero object.
 */
const maximum = createVariadicOperation(maximumNumbers);

export default maximum;

import { subtract as subtractNumbers } from "@dinero.js/core/calculator/number";
import { createVariadicOperation } from "@dinero.js/fp";

/**
 * Subtract the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to subtract.
 *
 * @returns A new functional Dinero object.
 */
const subtract = createVariadicOperation(subtractNumbers);

export default subtract;

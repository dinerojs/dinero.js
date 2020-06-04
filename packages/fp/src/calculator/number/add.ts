import { add as addNumbers } from "@dinero.js/core/calculator/number";
import { createVariadicOperation } from "@dinero.js/fp";

/**
 * Add up the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to add.
 *
 * @returns A new functional Dinero object.
 */
const add = createVariadicOperation(addNumbers);

export default add;

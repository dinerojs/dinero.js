import { multiply as multiplyNumbers } from '@dinero.js/core/calculator/number';
import { createVariadicOperation } from '@dinero.js/fp';

/**
 * Multiply the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to multiply.
 *
 * @returns A new functional Dinero object.
 */
const multiply = createVariadicOperation(multiplyNumbers);

export default multiply;

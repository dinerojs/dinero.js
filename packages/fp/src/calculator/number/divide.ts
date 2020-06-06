import { divide as divideNumbers } from '@dinero.js/core/calculator/number';
import { createVariadicOperation } from '@dinero.js/fp';

/**
 * Divide the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to divide.
 *
 * @returns A new functional Dinero object.
 */
const divide = createVariadicOperation(divideNumbers);

export default divide;

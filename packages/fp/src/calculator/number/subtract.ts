import { subtract as subtractNumbers } from '@dinero.js/core/calculator/number';
import { createBinaryOperation } from '../../factories';

/**
 * Subtract the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to subtract.
 *
 * @returns A new functional Dinero object.
 */
const subtract = createBinaryOperation(subtractNumbers);

export default subtract;

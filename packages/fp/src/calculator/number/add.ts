import { add as addNumbers } from '@dinero.js/core/calculator/number';
import { createBinaryOperation } from '../../factories';

/**
 * Add up the passed functional Dinero objects.
 *
 * @param functionalDineros The functional Dinero objects to add.
 *
 * @returns A new functional Dinero object.
 */
const add = createBinaryOperation(addNumbers);

export default add;

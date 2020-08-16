import { add } from '@dinero.js/core';
import { add as addNumbers } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Add up the passed functional Dinero objects.
 *
 * @param augend The functional Dinero object to add to.
 * @param addend The functional Dinero object to add.
 *
 * @returns A new functional Dinero object.
 */
const functionalAdd = add(dinero, { add: addNumbers });

export default functionalAdd;

import { add } from '@dinero.js/core';
import { add as addNumbers } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Add up the passed pure Dinero objects.
 *
 * @param augend The pure Dinero object to add to.
 * @param addend The pure Dinero object to add.
 *
 * @returns A new pure Dinero object.
 */
const pureAdd = add(dinero, { add: addNumbers });

export default pureAdd;

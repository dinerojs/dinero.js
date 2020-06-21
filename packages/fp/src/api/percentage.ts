import { percentage } from '@dinero.js/core';
import { percentage as percentageNumbers } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Extract a percentage of a functional Dinero object.
 *
 * @param dineroObject The functional Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new functional Dinero object.
 */
const functionalPercentage = percentage(dinero, {
  percentage: percentageNumbers,
});

export default functionalPercentage;

import { percentage } from '@dinero.js/core';
import { percentage as percentageNumbers } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Extract a percentage of a pure Dinero object.
 *
 * @param dineroObject The pure Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new pure Dinero object.
 */
const purePercentage = percentage(dinero, {
  percentage: percentageNumbers,
});

export default purePercentage;

import { createPercentage } from '@dinero.js/core';
import { percentage as percentageNumbers } from '@dinero.js/calculator/number';

/**
 * Extract a percentage of a Dinero object.
 *
 * @param dineroObject The Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new Dinero object.
 */
export const percentage = createPercentage({
  percentage: percentageNumbers,
});

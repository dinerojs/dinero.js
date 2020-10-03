import { percentage as corePercentage } from '@dinero.js/core';
import { percentage as percentageNumbers } from '@dinero.js/core/calculator';
import { buildMethod } from '../buildMethod';

/**
 * Extract a percentage of a pure Dinero object.
 *
 * @param dineroObject The pure Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new pure Dinero object.
 */
export const percentage = buildMethod(corePercentage, {
  percentage: percentageNumbers,
});

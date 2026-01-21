import type { DivideOperation } from '..';
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round away from zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfAwayFromZero: DivideOperation;

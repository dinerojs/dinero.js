import type { TransformOperation } from '@dinero.js/core';

/**
 * Transforms an value to a number.
 *
 * @param input - The value to transform.
 *
 * @returns The transformed value.
 */
export const toNumber: TransformOperation<number, number> = (input) => input;

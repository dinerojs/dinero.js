import { ComparisonOperator } from '@dinero.js/core';
import type { BinaryOperation } from '@dinero.js/core';
/**
 * Compare two bigints.
 *
 * @param a - The first bigint to compare.
 * @param b - The second bigint to compare.
 *
 * @returns Whether the two bigints are equal, or whether the first one is greater or less than the other.
 */
export declare const compare: BinaryOperation<bigint, ComparisonOperator>;

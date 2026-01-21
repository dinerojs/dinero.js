import { BinaryOperation } from '@dinero.js/core';
import { ComparisonOperator } from '@dinero.js/core';
import { UnaryOperation } from '@dinero.js/core';

/**
 * Returns the sum of two bigints.
 *
 * @param augend - The bigint to add to.
 * @param addend - The bigint to add.
 *
 * @returns The sum of the two bigints.
 */
export declare const add: BinaryOperation<bigint>;

export declare const calculator: {
    add: BinaryOperation<bigint, bigint>;
    compare: BinaryOperation<bigint, ComparisonOperator>;
    decrement: UnaryOperation<bigint, bigint>;
    increment: UnaryOperation<bigint, bigint>;
    integerDivide: BinaryOperation<bigint, bigint>;
    modulo: BinaryOperation<bigint, bigint>;
    multiply: BinaryOperation<bigint, bigint>;
    power: BinaryOperation<bigint, bigint>;
    subtract: BinaryOperation<bigint, bigint>;
    zero: typeof zero;
};

/**
 * Compare two bigints.
 *
 * @param a - The first bigint to compare.
 * @param b - The second bigint to compare.
 *
 * @returns Whether the two bigints are equal, or whether the first one is greater or less than the other.
 */
export declare const compare: BinaryOperation<bigint, ComparisonOperator>;

/**
 * Returns an decremented bigint.
 *
 * @param value - The bigint to decrement.
 *
 * @returns The decremented bigint.
 */
export declare const decrement: UnaryOperation<bigint>;

/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
export declare const increment: UnaryOperation<bigint>;

/**
 * Returns the quotient of two bigints with no fractional part.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The quotient of the two bigints.
 */
export declare const integerDivide: BinaryOperation<bigint>;

/**
 * Returns the remainder of two bigints.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The remainder of the two bigints.
 */
export declare const modulo: BinaryOperation<bigint>;

/**
 * Returns the product of two bigints.
 *
 * @param multiplicand - The bigint to multiply.
 * @param multiplier - The bigint to multiply with.
 *
 * @returns The product of the two bigints.
 */
export declare const multiply: BinaryOperation<bigint>;

/**
 * Returns an bigint to the power of an exponent.
 *
 * @param base - The base bigint.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
export declare const power: BinaryOperation<bigint>;

/**
 * Returns the difference between two bigints.
 *
 * @param minuend - The bigint to subtract from.
 * @param subtrahend - The bigint to subtract.
 *
 * @returns The difference of the two bigints.
 */
export declare const subtract: BinaryOperation<bigint>;

/**
 * Return zero as a bigint.
 *
 * @returns Zero as a bigint.
 */
export declare function zero(): bigint;

export { }

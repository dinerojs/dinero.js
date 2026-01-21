import { BinaryOperation } from '@dinero.js/core';
import { ComparisonOperator } from '@dinero.js/core';
import { UnaryOperation } from '@dinero.js/core';

/**
 * Returns the sum of two numbers.
 *
 * @param augend - The number to add to.
 * @param addend - The number to add.
 *
 * @returns The sum of the two numbers.
 */
export declare const add: BinaryOperation<number>;

export declare const calculator: {
    add: BinaryOperation<number, number>;
    compare: BinaryOperation<number, ComparisonOperator>;
    decrement: UnaryOperation<number, number>;
    increment: UnaryOperation<number, number>;
    integerDivide: BinaryOperation<number, number>;
    modulo: BinaryOperation<number, number>;
    multiply: BinaryOperation<number, number>;
    power: BinaryOperation<number, number>;
    subtract: BinaryOperation<number, number>;
    zero: typeof zero;
};

/**
 * Compare two numbers.
 *
 * @param a - The first number to compare.
 * @param b - The second number to compare.
 *
 * @returns Whether the two numbers are equal, or whether the first one is greater or less than the other.
 */
export declare const compare: BinaryOperation<number, ComparisonOperator>;

/**
 * Returns an decremented number.
 *
 * @param value - The number to decrement.
 *
 * @returns The decremented number.
 */
export declare const decrement: UnaryOperation<number>;

/**
 * Returns an incremented number.
 *
 * @param value - The number to increment.
 *
 * @returns The incremented number.
 */
export declare const increment: UnaryOperation<number>;

/**
 * Returns the quotient of two numbers with no fractional part.
 *
 * @param dividend - The number to divide.
 * @param divisor - The number to divide with.
 *
 * @returns The quotient of the two numbers.
 */
export declare const integerDivide: BinaryOperation<number>;

/**
 * Returns the remainder of two numbers.
 *
 * @param dividend - The number to divide.
 * @param divisor - The number to divide with.
 *
 * @returns The remainder of the two numbers.
 */
export declare const modulo: BinaryOperation<number>;

/**
 * Returns the product of two numbers.
 *
 * @param multiplicand - The number to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns The product of the two numbers.
 */
export declare const multiply: BinaryOperation<number>;

/**
 * Returns an number to the power of an exponent.
 *
 * @param base - The base number.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
export declare const power: BinaryOperation<number>;

/**
 * Returns the difference between two numbers.
 *
 * @param minuend - The number to subtract from.
 * @param subtrahend - The number to subtract.
 *
 * @returns The difference of the two numbers.
 */
export declare const subtract: BinaryOperation<number>;

/**
 * Return zero as a number.
 *
 * @returns Zero as a number.
 */
export declare function zero(): number;

export { }

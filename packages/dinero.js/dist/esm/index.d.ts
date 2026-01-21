import type { AddParams } from '@dinero.js/core';
import type { AllocateParams } from '@dinero.js/core';
import { Calculator } from '@dinero.js/core';
import type { CompareParams } from '@dinero.js/core';
import { ComparisonOperator } from '@dinero.js/core';
import type { ConvertParams } from '@dinero.js/core';
import { createDinero } from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';
import { Dinero } from '@dinero.js/core';
import { DineroFactory } from '@dinero.js/core';
import { DineroOptions } from '@dinero.js/core';
import { DineroSnapshot } from '@dinero.js/core';
import { DivideOperation } from '@dinero.js/core';
import { down } from '@dinero.js/core';
import type { EqualParams } from '@dinero.js/core';
import { Formatter } from '@dinero.js/core';
import type { GreaterThanOrEqualParams } from '@dinero.js/core';
import type { GreaterThanParams } from '@dinero.js/core';
import { halfAwayFromZero } from '@dinero.js/core';
import { halfDown } from '@dinero.js/core';
import { halfEven } from '@dinero.js/core';
import { halfOdd } from '@dinero.js/core';
import { halfTowardsZero } from '@dinero.js/core';
import { halfUp } from '@dinero.js/core';
import type { HasSubUnitsParams } from '@dinero.js/core';
import type { HaveSameAmountParams } from '@dinero.js/core';
import { haveSameCurrency as haveSameCurrency_2 } from '@dinero.js/core';
import type { IsNegativeParams } from '@dinero.js/core';
import type { IsPositiveParams } from '@dinero.js/core';
import type { IsZeroParams } from '@dinero.js/core';
import type { LessThanOrEqualParams } from '@dinero.js/core';
import type { LessThanParams } from '@dinero.js/core';
import type { MaximumParams } from '@dinero.js/core';
import type { MinimumParams } from '@dinero.js/core';
import type { MultiplyParams } from '@dinero.js/core';
import type { NormalizeScaleParams } from '@dinero.js/core';
import { Rates } from '@dinero.js/core';
import type { SubtractParams } from '@dinero.js/core';
import { toSnapshot as toSnapshot_2 } from '@dinero.js/core';
import { Transformer as Transformer_2 } from '@dinero.js/core';
import type { TransformScaleParams } from '@dinero.js/core';
import type { TrimScaleParams } from '@dinero.js/core';
import { up } from '@dinero.js/core';

/**
 * Add up the passed Dinero objects.
 *
 * @param augend - The Dinero object to add to.
 * @param addend - The Dinero object to add.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function add<TAmount>(...[augend, addend]: AddParams<TAmount>): Dinero<TAmount>;

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject - The Dinero object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function allocate<TAmount>(...[dineroObject, ratios]: AllocateParams<TAmount>): Dinero<TAmount>[];

export { Calculator }

/**
 * Compare the value of a Dinero object relative to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns One of -1, 0, or 1 depending on whether the first Dinero object is less than, equal to, or greater than the other.
 *
 * @public
 */
export declare function compare<TAmount>(...[dineroObject, comparator]: CompareParams<TAmount>): ComparisonOperator;

export { ComparisonOperator }

/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject - The Dinero object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Dinero object.
 *
 * @public
 */
export declare function convert<TAmount>(...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>): Dinero<TAmount>;

export { createDinero }

export { Currency }

export { Dinero }

/**
 * Create a Dinero object.
 *
 * @param options.amount - The amount in minor currency units.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Dinero object.
 *
 * @public
 */
export declare const dinero: ({ amount, currency: { code, base, exponent }, scale, }: DineroOptions<number>) => Dinero<number>;

export { DineroFactory }

export { DineroOptions }

export { DineroSnapshot }

export { DivideOperation }

export { down }

/**
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject - The first Dinero object to compare.
 * @param comparator - The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 *
 * @public
 */
export declare function equal<TAmount>(...[dineroObject, comparator]: EqualParams<TAmount>): boolean;

export { Formatter }

/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 *
 * @public
 */
export declare function greaterThan<TAmount>(...[dineroObject, comparator]: GreaterThanParams<TAmount>): boolean;

/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 *
 * @public
 */
export declare function greaterThanOrEqual<TAmount>(...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>): boolean;

export { halfAwayFromZero }

export { halfDown }

export { halfEven }

export { halfOdd }

export { halfTowardsZero }

export { halfUp }

/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 *
 * @public
 */
export declare function hasSubUnits<TAmount>(...[dineroObject]: HasSubUnitsParams<TAmount>): boolean;

/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 *
 * @public
 */
export declare function haveSameAmount<TAmount>(...[dineroObjects]: HaveSameAmountParams<TAmount>): boolean;

/**
 * Check whether a set of Dinero objects have the same currency.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same currency.
 *
 * @public
 */
export declare const haveSameCurrency: typeof haveSameCurrency_2;

/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is negative.
 *
 * @public
 */
export declare function isNegative<TAmount>(...[dineroObject]: IsNegativeParams<TAmount>): boolean;

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is positive.
 *
 * @public
 */
export declare function isPositive<TAmount>(...[dineroObject]: IsPositiveParams<TAmount>): boolean;

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 *
 * @public
 */
export declare function isZero<TAmount>(...[dineroObject]: IsZeroParams<TAmount>): boolean;

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 *
 * @public
 */
export declare function lessThan<TAmount>(...[dineroObject, comparator]: LessThanParams<TAmount>): boolean;

/**
 * Check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 *
 * @public
 */
export declare function lessThanOrEqual<TAmount>(...[dineroObject, comparator]: LessThanOrEqualParams<TAmount>): boolean;

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function maximum<TAmount>(...[dineroObjects]: MaximumParams<TAmount>): Dinero<TAmount>;

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function minimum<TAmount>(...[dineroObjects]: MinimumParams<TAmount>): Dinero<TAmount>;

/**
 * Multiply the passed Dinero object.
 *
 * @param multiplicand - The Dinero object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function multiply<TAmount>(...[multiplicand, multiplier]: MultiplyParams<TAmount>): Dinero<TAmount>;

/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects - The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 *
 * @public
 */
export declare function normalizeScale<TAmount>(...[dineroObjects]: NormalizeScaleParams<TAmount>): Dinero<TAmount>[];

export { Rates }

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function subtract<TAmount>(...[minuend, subtrahend]: SubtractParams<TAmount>): Dinero<TAmount>;

export declare function toDecimal<TAmount>(dineroObject: Dinero<TAmount>): string;

export declare function toDecimal<TAmount, TOutput>(dineroObject: Dinero<TAmount>, transformer: Transformer_2<TAmount, TOutput, string>): TOutput;

/**
 * Get a snapshot of a Dinero object.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns A snapshot of the object.
 *
 * @public
 */
export declare const toSnapshot: typeof toSnapshot_2;

export declare function toUnits<TAmount>(dineroObject: Dinero<TAmount>): readonly TAmount[];

export declare function toUnits<TAmount, TOutput>(dineroObject: Dinero<TAmount>, transformer: Transformer_2<TAmount, TOutput, readonly TAmount[]>): TOutput;

export { Transformer_2 as Transformer }

/**
 * Transform a Dinero object to a new scale.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param newScale - The new scale.
 * @param divide - A custom divide function.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function transformScale<TAmount>(...[dineroObject, newScale, divide]: TransformScaleParams<TAmount>): Dinero<TAmount>;

/**
 * Trim a Dinero object's scale as much as possible, down to the currency exponent.
 *
 * @param dineroObject - The Dinero object which scale to trim.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function trimScale<TAmount>(...[dineroObject]: TrimScaleParams<TAmount>): Dinero<TAmount>;

export { up }

export { }

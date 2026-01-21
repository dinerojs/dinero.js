import type { Currency } from '@dinero.js/currencies';

export declare type AddParams<TAmount> = readonly [
augend: Dinero<TAmount>,
addend: Dinero<TAmount>
];

export declare type AllocateParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
ratios: ReadonlyArray<ScaledAmount<TAmount> | TAmount>
];

/**
 * Assert a condition.
 *
 * @param condition - The condition to verify.
 * @param message - The error message to throw.
 *
 * @throws If the condition isn't met.
 */
export declare function assert(condition: boolean, message: string): void;

export declare type BinaryOperation<TInput, TOutput = TInput> = (a: TInput, b: TInput) => TOutput;

export declare type Calculator<TInput> = {
    readonly add: BinaryOperation<TInput>;
    readonly compare: BinaryOperation<TInput, ComparisonOperator>;
    readonly decrement: UnaryOperation<TInput>;
    readonly integerDivide: BinaryOperation<TInput>;
    readonly increment: UnaryOperation<TInput>;
    readonly modulo: BinaryOperation<TInput>;
    readonly multiply: BinaryOperation<TInput>;
    readonly power: BinaryOperation<TInput>;
    readonly subtract: BinaryOperation<TInput>;
    readonly zero: () => TInput;
};

export declare type CompareParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

export declare enum ComparisonOperator {
    LT = -1,
    EQ = 0,
    GT = 1
}

export declare function convert<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, newCurrency: Currency<TAmount>, rates: Rates<TAmount>) => Dinero<TAmount>;

export declare type ConvertParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
newCurrency: Currency<TAmount>,
rates: Rates<TAmount>
];

export declare function createDinero<TAmount>({ calculator, onCreate, formatter, }: CreateDineroOptions<TAmount>): ({ amount, currency: { code, base, exponent }, scale, }: DineroOptions<TAmount>) => Dinero<TAmount>;

export declare type CreateDineroOptions<TAmount> = {
    readonly calculator: Calculator<TAmount>;
    readonly formatter?: Formatter<TAmount>;
    readonly onCreate?: (options: DineroOptions<TAmount>) => void;
};

export declare type Dinero<TAmount> = {
    readonly calculator: Calculator<TAmount>;
    readonly formatter: Formatter<TAmount>;
    readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
    readonly toJSON: () => DineroSnapshot<TAmount>;
};

export declare type DineroFactory<TAmount> = ({ amount, currency, scale, }: DineroOptions<TAmount>) => Dinero<TAmount>;

export declare type DineroOptions<TAmount> = {
    readonly amount: TAmount;
    readonly currency: Currency<TAmount>;
    readonly scale?: TAmount;
};

export declare type DineroSnapshot<TAmount> = {
    readonly amount: TAmount;
    readonly currency: Currency<TAmount>;
    readonly scale: TAmount;
};

export declare type DivideOperation = <TAmount>(amount: TAmount, factor: TAmount, calculator: Calculator<TAmount>) => TAmount;

/**
 * Divide and round down.
 *
 * Rounding down happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const down: DivideOperation;

export declare function equal<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;

export declare type EqualParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

export declare type Formatter<TAmount> = {
    readonly toNumber: (value?: TAmount) => number;
    readonly toString: (value?: TAmount) => string;
};

export declare type GreaterThanOrEqualParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

export declare type GreaterThanParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

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

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round down.
 *
 * Rounding down happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and less than half (e.g., 1.4).
 * - The quotient is negative and greater than half (e.g., -1.6).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfDown: DivideOperation;

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest even integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfEven: DivideOperation;

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest odd integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfOdd: DivideOperation;

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round towards zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfTowardsZero: DivideOperation;

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round up.
 *
 * Rounding up happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and greater than half (e.g., 1.6).
 * - The quotient is negative and less than half (e.g., -1.4).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const halfUp: DivideOperation;

export declare function hasSubUnits<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;

export declare type HasSubUnitsParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>
];

export declare function haveSameAmount<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => boolean;

export declare type HaveSameAmountParams<TAmount> = readonly [
dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export declare function haveSameCurrency<TAmount>(dineroObjects: ReadonlyArray<Dinero<TAmount>>): boolean;

export declare const INVALID_AMOUNT_MESSAGE = "Amount is invalid.";

export declare const INVALID_RATIOS_MESSAGE = "Ratios are invalid.";

export declare const INVALID_SCALE_MESSAGE = "Scale is invalid.";

export declare function isNegative<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;

export declare type IsNegativeParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>
];

export declare function isPositive<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;

export declare type IsPositiveParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>
];

export declare function isZero<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;

export declare type IsZeroParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export declare type LessThanOrEqualParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

export declare type LessThanParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
comparator: Dinero<TAmount>
];

export declare type MaximumParams<TAmount> = readonly [
dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export declare type MinimumParams<TAmount> = readonly [
dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export declare function multiply<TAmount>(calculator: Calculator<TAmount>): (multiplicand: Dinero<TAmount>, multiplier: TAmount | ScaledAmount<TAmount>) => Dinero<TAmount>;

export declare type MultiplyParams<TAmount> = readonly [
multiplicand: Dinero<TAmount>,
multiplier: ScaledAmount<TAmount> | TAmount
];

export declare const NON_DECIMAL_CURRENCY_MESSAGE = "Currency is not decimal.";

export declare function normalizeScale<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>[];

export declare type NormalizeScaleParams<TAmount> = readonly [
dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export declare type Rate<TAmount> = ScaledAmount<TAmount> | TAmount;

export declare type Rates<TAmount> = Record<string, Rate<TAmount>>;

export declare function safeAdd<TAmount>(calculator: Calculator<TAmount>): (augend: Dinero<TAmount>, addend: Dinero<TAmount>) => Dinero<TAmount>;

export declare function safeAllocate<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, ratios: readonly (TAmount | ScaledAmount<TAmount>)[]) => Dinero<TAmount>[];

export declare function safeCompare<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => ComparisonOperator;

export declare function safeGreaterThan<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;

export declare function safeGreaterThanOrEqual<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;

export declare function safeLessThan<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;

export declare function safeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;

export declare function safeMaximum<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>;

export declare function safeMinimum<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>;

export declare function safeSubtract<TAmount>(calculator: Calculator<TAmount>): (minuend: Dinero<TAmount>, subtrahend: Dinero<TAmount>) => Dinero<TAmount>;

export declare type ScaledAmount<TAmount> = {
    readonly amount: TAmount;
    readonly scale?: TAmount;
};

export declare type SubtractParams<TAmount> = readonly [
minuend: Dinero<TAmount>,
subtrahend: Dinero<TAmount>
];

export declare function toDecimal<TAmount, TOutput>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, transformer?: Transformer_2<TAmount, TOutput, string> | undefined) => string | TOutput;

export declare type ToDecimalParams<TAmount, TOutput> = readonly [
dineroObject: Dinero<TAmount>,
transformer?: Transformer_2<TAmount, TOutput, string>
];

export declare function toSnapshot<TAmount>(dineroObject: Dinero<TAmount>): DineroSnapshot<TAmount>;

export declare function toUnits<TAmount, TOutput>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, transformer?: Transformer_2<TAmount, TOutput, readonly TAmount[]> | undefined) => TOutput | readonly TAmount[];

export declare type ToUnitsParams<TAmount, TOutput> = readonly [
dineroObject: Dinero<TAmount>,
transformer?: Transformer_2<TAmount, TOutput, readonly TAmount[]>
];

declare type Transformer_2<TAmount, TOutput, TValue> = (options: TransformerOptions<TAmount, TValue>) => TOutput;
export { Transformer_2 as Transformer }

export declare type TransformerOptions<TAmount, TValue> = {
    readonly value: TValue;
    readonly currency: Currency<TAmount>;
};

export declare function transformScale<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, newScale: TAmount, divide?: DivideOperation | undefined) => Dinero<TAmount>;

export declare type TransformScaleParams<TAmount> = readonly [
dineroObject: Dinero<TAmount>,
newScale: TAmount,
divide?: DivideOperation
];

export declare function trimScale<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => Dinero<TAmount>;

export declare type TrimScaleParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export declare type UnaryOperation<TInput, TOutput = TInput> = (value: TInput) => TOutput;

export declare const UNEQUAL_CURRENCIES_MESSAGE = "Objects must have the same currency.";

export declare const UNEQUAL_SCALES_MESSAGE = "Objects must have the same scale.";

/**
 * Divide and round up.
 *
 * Rounding up happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export declare const up: DivideOperation;

export { }

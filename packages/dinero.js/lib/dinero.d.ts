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
export declare const dinero: ({ amount, currency: { code, base, exponent }, scale, }: import("@dinero.js/core").DineroOptions<number>) => import("@dinero.js/core").Dinero<number>;

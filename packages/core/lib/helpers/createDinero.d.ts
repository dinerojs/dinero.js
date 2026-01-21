import type { Calculator, Dinero, DineroOptions, Formatter } from '../types';
export declare type CreateDineroOptions<TAmount> = {
    readonly calculator: Calculator<TAmount>;
    readonly formatter?: Formatter<TAmount>;
    readonly onCreate?: (options: DineroOptions<TAmount>) => void;
};
export declare function createDinero<TAmount>({ calculator, onCreate, formatter, }: CreateDineroOptions<TAmount>): ({ amount, currency: { code, base, exponent }, scale, }: DineroOptions<TAmount>) => Dinero<TAmount>;

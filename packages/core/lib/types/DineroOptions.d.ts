import type { Currency } from '@dinero.js/currencies';
export declare type DineroOptions<TAmount> = {
    readonly amount: TAmount;
    readonly currency: Currency<TAmount>;
    readonly scale?: TAmount;
};

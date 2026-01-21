import type { Currency } from '@dinero.js/currencies';
export declare type TransformerOptions<TAmount, TValue> = {
    readonly value: TValue;
    readonly currency: Currency<TAmount>;
};
export declare type Transformer<TAmount, TOutput, TValue> = (options: TransformerOptions<TAmount, TValue>) => TOutput;

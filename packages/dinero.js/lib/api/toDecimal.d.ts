import type { Dinero, Transformer } from '@dinero.js/core';
export declare function toDecimal<TAmount>(dineroObject: Dinero<TAmount>): string;
export declare function toDecimal<TAmount, TOutput>(dineroObject: Dinero<TAmount>, transformer: Transformer<TAmount, TOutput, string>): TOutput;

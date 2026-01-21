import type { Dinero, Transformer } from '@dinero.js/core';
export declare function toUnits<TAmount>(dineroObject: Dinero<TAmount>): readonly TAmount[];
export declare function toUnits<TAmount, TOutput>(dineroObject: Dinero<TAmount>, transformer: Transformer<TAmount, TOutput, readonly TAmount[]>): TOutput;

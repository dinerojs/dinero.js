import type { ScaledAmount } from './ScaledAmount';
export declare type Rate<TAmount> = ScaledAmount<TAmount> | TAmount;
export declare type Rates<TAmount> = Record<string, Rate<TAmount>>;

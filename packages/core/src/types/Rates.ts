import type { ScaledAmount } from './ScaledAmount';

export type Rate<TAmount> = ScaledAmount<TAmount> | TAmount;

export type Rates<TAmount> = Record<string, Rate<TAmount>>;

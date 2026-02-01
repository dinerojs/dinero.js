import type { DineroScaledAmount } from './DineroScaledAmount';

export type DineroRate<TAmount> = DineroScaledAmount<TAmount> | TAmount;

export type DineroRates<TAmount> = Record<string, DineroRate<TAmount>>;

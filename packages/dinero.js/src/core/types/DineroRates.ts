import type { DineroScaledAmount } from './DineroScaledAmount';

export type Rate<TAmount> = DineroScaledAmount<TAmount> | TAmount;

export type DineroRates<TAmount> = Record<string, Rate<TAmount>>;

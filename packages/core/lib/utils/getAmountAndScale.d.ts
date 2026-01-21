import type { ScaledAmount } from '../types';
export declare function getAmountAndScale<TAmount>(value: ScaledAmount<TAmount> | TAmount, zero: TAmount): {
    amount: TAmount;
    scale: TAmount;
};

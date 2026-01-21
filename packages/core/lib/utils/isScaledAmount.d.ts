import type { Rate, ScaledAmount } from '../types';
export declare function isScaledAmount<TAmount>(amount: Rate<TAmount>): amount is ScaledAmount<TAmount>;

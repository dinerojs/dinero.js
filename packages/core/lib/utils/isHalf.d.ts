import type { Calculator } from '../types';
export declare function isHalf<TAmount>(calculator: Calculator<TAmount>): (input: TAmount, total: TAmount) => boolean;

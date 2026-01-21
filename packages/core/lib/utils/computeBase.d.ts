import type { Calculator } from '../types';
export declare function computeBase<TAmount>(calculator: Calculator<TAmount>): (base: TAmount | readonly TAmount[]) => TAmount;

import type { Calculator } from '../types';
export declare function sign<TAmount>(calculator: Calculator<TAmount>): (input: TAmount) => TAmount;

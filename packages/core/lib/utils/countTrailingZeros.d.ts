import type { Calculator } from '../types';
declare type CountTrailingZerosCalculator<TAmount> = Calculator<TAmount>;
export declare function countTrailingZeros<TAmount>(calculator: CountTrailingZerosCalculator<TAmount>): (input: TAmount, base: TAmount) => TAmount;
export {};

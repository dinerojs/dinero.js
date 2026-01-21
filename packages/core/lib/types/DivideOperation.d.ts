import type { Calculator } from '.';
export declare type DivideOperation = <TAmount>(amount: TAmount, factor: TAmount, calculator: Calculator<TAmount>) => TAmount;

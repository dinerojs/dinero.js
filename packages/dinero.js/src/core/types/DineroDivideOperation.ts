import type { DineroCalculator } from '.';

export type DineroDivideOperation = <TAmount>(
  amount: TAmount,
  factor: TAmount,
  calculator: DineroCalculator<TAmount>
) => TAmount;

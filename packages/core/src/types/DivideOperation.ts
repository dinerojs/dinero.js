import type { Calculator } from '.';

export type DivideOperation = <TAmount>(
  amount: TAmount,
  factor: TAmount,
  calculator: Calculator<TAmount>
) => TAmount;

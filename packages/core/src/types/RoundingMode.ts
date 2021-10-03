import type { Calculator } from '.';

export type RoundingMode = <TAmount>(
  amount: TAmount,
  factor: TAmount,
  calculator: Calculator<TAmount>
) => TAmount;

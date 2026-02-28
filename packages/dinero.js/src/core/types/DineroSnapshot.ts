import type { DineroCurrency } from '../../currencies';

export type DineroSnapshot<TAmount, TCurrency extends string = string> = {
  readonly amount: TAmount;
  readonly currency: DineroCurrency<TAmount, TCurrency>;
  readonly scale: TAmount;
};

import type { DineroCurrency } from '../../currencies';

export type DineroSnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: DineroCurrency<TAmount>;
  readonly scale: TAmount;
};

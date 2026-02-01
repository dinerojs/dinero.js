import type { DineroCurrency } from '../../currencies';

export type DineroOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: DineroCurrency<TAmount>;
  readonly scale?: TAmount;
};

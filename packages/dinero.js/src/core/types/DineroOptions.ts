import type { Currency } from '../../currencies';

export type DineroOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};

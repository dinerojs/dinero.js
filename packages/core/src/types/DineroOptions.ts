import type { Currency } from './Currency';

export type DineroOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};

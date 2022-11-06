import type { Currency } from './Currency';

export type DineroSnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale: TAmount;
};

import type { Dinero, DineroOptions } from '.';

export type DineroFactory<TAmount> = ({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount>) => Dinero<TAmount>;

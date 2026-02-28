import type { Dinero, DineroOptions } from '.';

export type DineroFactory<TAmount> = <TCurrency extends string>({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount, TCurrency>) => Dinero<TAmount, TCurrency>;

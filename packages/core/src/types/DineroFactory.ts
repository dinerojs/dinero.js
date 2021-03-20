import { DineroOptions } from '.';

export type DineroFactory<TAmount, TDinero> = ({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount>) => TDinero;

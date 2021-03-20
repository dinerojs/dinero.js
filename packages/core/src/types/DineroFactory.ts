import DineroOptions from './DineroOptions';

export type DineroFactory<TAmount, TDinero> = ({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount>) => TDinero;

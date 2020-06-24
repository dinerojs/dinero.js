import DineroOptions from './DineroOptions';

type DineroFactory<TAmount, TDinero> = ({
  amount,
  currency,
  scale,
}: DineroOptions<TAmount>) => TDinero;

export default DineroFactory;

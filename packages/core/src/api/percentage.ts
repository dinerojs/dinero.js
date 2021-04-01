import { Dinero } from '../types';
import { Dependencies } from './types';

export type PercentageDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'percentage'>;

export function percentage<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: PercentageDependencies<TAmount, TDinero>) {
  return function _percentage(dineroObject: TDinero, share: TAmount) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return factory({
      amount: calculator.percentage(amount, share),
      currency,
      scale,
    });
  };
}

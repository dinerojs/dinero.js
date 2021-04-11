import { Dinero } from '../types';
import { Dependencies } from './types';

export type PercentageDependencies<TAmount> = Dependencies<
  TAmount,
  'percentage'
>;

export function percentage<TAmount>({
  calculator,
}: PercentageDependencies<TAmount>) {
  return function _percentage(dineroObject: Dinero<TAmount>, share: TAmount) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return dineroObject.create({
      amount: calculator.percentage(amount, share),
      currency,
      scale,
    });
  };
}

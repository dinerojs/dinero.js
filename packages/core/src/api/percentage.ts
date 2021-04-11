import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type PercentageParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  share: TAmount
];

export type PercentageDependencies<TAmount> = Dependencies<
  TAmount,
  'percentage'
>;

export function percentage<TAmount>({
  calculator,
}: PercentageDependencies<TAmount>) {
  return function _percentage(
    ...[dineroObject, share]: PercentageParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return dineroObject.create({
      amount: calculator.percentage(amount, share),
      currency,
      scale,
    });
  };
}

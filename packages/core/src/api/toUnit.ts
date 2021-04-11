import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type ToUnitParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export type ToUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'divide' | 'power'
>;

export function toUnit<TAmount>({ calculator }: ToUnitDependencies<TAmount>) {
  return function _toUnit(...[dineroObject]: ToUnitParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, scale);

    return calculator.divide(amount, factor);
  };
}

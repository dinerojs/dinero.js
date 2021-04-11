import { Dinero } from '../types';
import { Dependencies } from './types';

export type ToUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'divide' | 'power'
>;

export function toUnit<TAmount>({ calculator }: ToUnitDependencies<TAmount>) {
  return (dineroObject: Dinero<TAmount>) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, scale);

    return calculator.divide(amount, factor);
  };
}

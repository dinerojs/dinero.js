import { Dinero } from '../types';
import { Dependencies } from './types';

export type ToUnitDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'divide' | 'power'>;

export function toUnit<TAmount, TDinero extends Dinero<TAmount>>({
  calculator,
}: ToUnitDependencies<TAmount, TDinero>) {
  return (dineroObject: TDinero) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, scale);

    return calculator.divide(amount, factor);
  };
}

import { Dinero } from '../types';
import { Dependencies } from './types';

export function percentage<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'percentage'>) {
  return function _percentage(dineroObject: TDinero, share: TAmount) {
    const { amount, currency, scale } = dineroObject.toJSON();

    return factory({
      amount: calculator.percentage(amount, share),
      currency,
      scale,
    });
  };
}

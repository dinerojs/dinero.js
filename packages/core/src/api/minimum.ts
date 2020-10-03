import { BaseDinero } from '../types';
import { minimum as min } from '../calculator/helpers';
import { Dependencies } from './types';

export function minimum<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'compare'>) {
  const minFn = min(calculator);

  return function _minimum(dineroObjects: readonly TDinero[]) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = minFn(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return factory({
      amount,
      currency,
      scale,
    });
  };
}

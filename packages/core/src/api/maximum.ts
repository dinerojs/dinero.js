import { BaseDinero } from '../types';
import { maximum as max } from '../calculator/helpers';
import { Dependencies } from './types';

export function maximum<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<TAmount, TDinero, 'compare'>) {
  const maxFn = max(calculator);

  return function _maximum(dineroObjects: readonly TDinero[]) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = maxFn(
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

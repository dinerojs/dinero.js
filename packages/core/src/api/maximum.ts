import { Dinero } from '../types';
import { maximum as max } from '../utils';
import { Dependencies } from './types';

export type MaximumDependencies<TAmount> = Dependencies<TAmount, 'compare'>;

export function maximum<TAmount>({ calculator }: MaximumDependencies<TAmount>) {
  const maxFn = max(calculator);

  return function _maximum(dineroObjects: ReadonlyArray<Dinero<TAmount>>) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = maxFn(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return firstDinero.create({
      amount,
      currency,
      scale,
    });
  };
}

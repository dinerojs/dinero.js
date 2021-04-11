import { Dinero } from '../types';
import { minimum as min } from '../utils';
import { Dependencies } from './types';

export type MinimumDependencies<TAmount> = Dependencies<TAmount, 'compare'>;

export function minimum<TAmount>({ calculator }: MinimumDependencies<TAmount>) {
  const minFn = min(calculator);

  return function _minimum(dineroObjects: ReadonlyArray<Dinero<TAmount>>) {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = minFn(
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

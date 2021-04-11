import type { Dinero } from '../types';
import { minimum as min } from '../utils';
import type { Dependencies } from './types';

export type MinimumParams<TAmount> = readonly [
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
];

export type MinimumDependencies<TAmount> = Dependencies<TAmount, 'compare'>;

export function minimum<TAmount>({ calculator }: MinimumDependencies<TAmount>) {
  const minFn = min(calculator);

  return function _minimum(...[dineroObjects]: MinimumParams<TAmount>) {
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

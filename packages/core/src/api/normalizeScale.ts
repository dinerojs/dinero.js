import { convertScale } from '.';
import { Dinero } from '../types';
import { maximum } from '../utils';
import { Dependencies } from './types';

export type NormalizeScaleDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function normalizeScale<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: NormalizeScaleDependencies<TAmount, TDinero>) {
  const maximumFn = maximum(calculator);
  const convertScaleFn = convertScale({ factory, calculator });

  return function _normalizeScale(dineroObjects: readonly TDinero[]) {
    const highestScale = dineroObjects.reduce((highest, current) => {
      const { scale } = current.toJSON();

      return maximumFn([highest, scale]);
    }, calculator.zero());

    return dineroObjects.map((d) => {
      const { scale } = d.toJSON();

      return scale !== highestScale
        ? convertScaleFn(d, highestScale, calculator.round)
        : d;
    });
  };
}

import { convertScale } from '.';
import { Dinero } from '../types';
import { maximum } from '../calculator/helpers';
import { Dependencies } from './types';

export function normalizeScale<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>) {
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

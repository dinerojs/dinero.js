import { Calculator } from '../calculator';
import { convertScale } from '.';
import { BaseDinero, DineroFactory } from '../types';
import { maximum } from '../helpers';

function normalizeScale<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
  >
) {
  return (dineroObjects: readonly TDinero[]) => {
    const highestScale = dineroObjects.reduce((highest, current) => {
      const { scale } = current.toJSON();

      return maximum(calculator)([highest, scale]);
    }, calculator.zero());

    return dineroObjects.map((d) => {
      const { scale } = d.toJSON();

      return scale !== highestScale
        ? convertScale(dineroFactory, calculator)(
            d,
            highestScale,
            calculator.round
          )
        : d;
    });
  };
}

export default normalizeScale;

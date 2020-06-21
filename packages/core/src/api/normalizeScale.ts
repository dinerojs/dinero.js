import { Calculator } from '../calculator';
import { convertScale } from '.';
import { DineroOptions, BaseDinero } from '../types';

function normalizeScale<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<
    Calculator<TAmount>,
    'add' | 'maximum' | 'zero' | 'multiply' | 'power' | 'subtract' | 'round'
  >
) {
  return (dineroObjects: readonly TDinero[]) => {
    const highestScale = dineroObjects.reduce((highest, current) => {
      const { scale } = current.toJSON();

      return calculator.maximum([highest, scale]);
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

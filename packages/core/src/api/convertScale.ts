import { Calculator, RoundingMode } from '../calculator';
import { DineroOptions, BaseDinero } from '../types';

function convertScale<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<
    Calculator<TAmount>,
    'subtract' | 'multiply' | 'power' | 'round'
  >
) {
  return (
    dineroObject: TDinero,
    newScale: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(
      currency.base,
      calculator.subtract(newScale, scale)
    );

    return dineroFactory({
      amount: roundingMode(calculator.multiply(amount, factor)),
      currency,
      scale: newScale,
    });
  };
}

export default convertScale;

import { Calculator, RoundingMode } from '../calculator';
import { DineroOptions, BaseDinero } from '../types';

function divide<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<Calculator<TAmount>, 'divide' | 'round'>
) {
  return (
    dividend: TDinero,
    divisor: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) => {
    const { amount, currency, scale } = dividend.toJSON();

    return dineroFactory({
      amount: roundingMode(calculator.divide(amount, divisor)),
      currency,
      scale,
    });
  };
}

export default divide;

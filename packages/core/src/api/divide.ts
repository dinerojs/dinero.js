import { Calculator, RoundingMode } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';

function divide<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
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

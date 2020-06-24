import { Calculator, RoundingMode } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';

function multiply<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'multiply' | 'round'>
) {
  return (
    multiplier: TDinero,
    multiplicand: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) => {
    const { amount, currency, scale } = multiplier.toJSON();

    return dineroFactory({
      amount: roundingMode(calculator.multiply(amount, multiplicand)),
      currency,
      scale,
    });
  };
}

export default multiply;

import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';

function percentage<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'percentage'>
) {
  return (dineroObject: TDinero, share: TAmount) => {
    const { amount, currency, scale } = dineroObject.toJSON();

    return dineroFactory({
      amount: calculator.percentage(amount, share),
      currency,
      scale,
    });
  };
}

export default percentage;

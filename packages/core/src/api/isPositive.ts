import { Calculator } from '../calculator';
import { BaseDinero } from '../types';

function isPositive<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'zero' | 'greaterThanOrEqual'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return calculator.greaterThanOrEqual(amount, calculator.zero());
  };
}

export default isPositive;

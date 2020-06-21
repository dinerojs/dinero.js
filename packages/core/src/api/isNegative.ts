import { Calculator } from '../calculator';
import { BaseDinero } from '../types';

function isNegative<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'zero' | 'lessThan'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return calculator.lessThan(amount, calculator.zero());
  };
}

export default isNegative;

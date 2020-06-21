import { Calculator } from '../calculator';
import { BaseDinero } from '../types';

function isZero<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'zero' | 'equal'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return calculator.equal(amount, calculator.zero());
  };
}

export default isZero;

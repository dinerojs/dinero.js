import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { equal } from '../calculator/helpers';

function isZero<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'compare' | 'zero'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return equal(calculator)(amount, calculator.zero());
  };
}

export default isZero;

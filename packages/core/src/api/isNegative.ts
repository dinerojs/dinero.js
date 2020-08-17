import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { lessThan } from '../calculator/helpers';

function isNegative<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'compare' | 'zero'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return lessThan(calculator)(amount, calculator.zero());
  };
}

export default isNegative;

import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { greaterThanOrEqual } from '../helpers';

function isPositive<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'compare' | 'zero'>
) {
  return (dineroObject: TDinero) => {
    const { amount } = dineroObject.toJSON();

    return greaterThanOrEqual(calculator)(amount, calculator.zero());
  };
}

export default isPositive;

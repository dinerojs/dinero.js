import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { equal } from '../calculator/helpers';

function hasSubUnits<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'compare' | 'modulo' | 'power' | 'zero'>
) {
  return (dineroObject: TDinero) => {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !equal(calculator)(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero()
    );
  };
}

export default hasSubUnits;

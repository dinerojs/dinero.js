import { Calculator } from '../calculator';
import { BaseDinero } from '../types';

function hasSubUnits<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'modulo' | 'power' | 'zero' | 'equal'>
) {
  return (dineroObject: TDinero) => {
    const { amount, currency, scale } = dineroObject.toJSON();

    return !calculator.equal(
      calculator.modulo(amount, calculator.power(currency.base, scale)),
      calculator.zero()
    );
  };
}

export default hasSubUnits;

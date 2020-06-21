import { Calculator } from '../calculator';
import { BaseDinero } from '../types';

function toUnit<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<Calculator<TAmount>, 'divide' | 'power'>
) {
  return (dineroObject: TDinero) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, scale);

    return calculator.divide(amount, factor);
  };
}

export default toUnit;

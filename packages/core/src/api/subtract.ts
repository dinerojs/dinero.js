import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';

function subtract<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'subtract'>
) {
  return (minuend: TDinero, subtrahend: TDinero) => {
    const { amount: minuendAmount, currency, scale } = minuend.toJSON();
    const { amount: subtrahendAmount } = subtrahend.toJSON();

    return dineroFactory({
      amount: calculator.subtract(minuendAmount, subtrahendAmount),
      currency,
      scale,
    });
  };
}

export default subtract;

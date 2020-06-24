import { BaseDinero, DineroFactory } from '../types';
import { Calculator } from '../calculator';

function add<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'add'>
) {
  return (augend: TDinero, addend: TDinero) => {
    const { amount: augendAmount, currency, scale } = augend.toJSON();
    const { amount: addendAmount } = addend.toJSON();

    return dineroFactory({
      amount: calculator.add(augendAmount, addendAmount),
      currency,
      scale,
    });
  };
}

export default add;

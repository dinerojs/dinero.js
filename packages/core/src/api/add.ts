import { DineroOptions, BaseDinero } from '../types';
import { Calculator } from '../calculator';

function add<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
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

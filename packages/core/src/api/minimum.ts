import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import { minimum as min } from '../helpers';

function minimum<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (dineroObjects: readonly TDinero[]) => {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = min(calculator)(
      dineroObjects.map((subject) => {
        const { amount: subjectAmount } = subject.toJSON();

        return subjectAmount;
      })
    );

    return dineroFactory({
      amount,
      currency,
      scale,
    });
  };
}

export default minimum;

import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import { maximum as max } from '../calculator/helpers';

function maximum<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (dineroObjects: readonly TDinero[]) => {
    const [firstDinero] = dineroObjects;
    const { currency, scale } = firstDinero.toJSON();

    const amount = max(calculator)(
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

export default maximum;

import { Calculator } from '../calculator';
import { BaseDinero, DineroOptions } from '../types';
import { normalizeScale } from '.';

function haveSameCurrency<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<
    Calculator<TAmount>,
    | 'add'
    | 'maximum'
    | 'multiply'
    | 'power'
    | 'subtract'
    | 'round'
    | 'zero'
    | 'equal'
  >
) {
  return (dineroObjects: readonly TDinero[]) => {
    const [firstDinero, ...otherDineros] = normalizeScale(
      dineroFactory,
      calculator
    )(dineroObjects);
    const { amount: comparatorAmount } = firstDinero.toJSON();

    return otherDineros.every((d) => {
      const { amount: subjectAmount } = d.toJSON();

      return calculator.equal(subjectAmount, comparatorAmount);
    });
  };
}

export default haveSameCurrency;

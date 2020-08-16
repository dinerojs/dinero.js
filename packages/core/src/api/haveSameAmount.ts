import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import { normalizeScale } from '.';
import { equal } from '../helpers';

function haveSameCurrency<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
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

      return equal(calculator)(subjectAmount, comparatorAmount);
    });
  };
}

export default haveSameCurrency;

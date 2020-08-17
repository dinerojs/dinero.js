import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import normalizeScale from './normalizeScale';
import { greaterThan as gt } from '../calculator/helpers';

function greaterThan<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
  >
) {
  return (dineroObject: TDinero, comparator: TDinero) => {
    const [subjectAmount, comparatorAmount] = normalizeScale(
      dineroFactory,
      calculator
    )([dineroObject, comparator]).map((d) => {
      const { amount } = d.toJSON();

      return amount;
    });

    return gt(calculator)(subjectAmount, comparatorAmount);
  };
}

export default greaterThan;

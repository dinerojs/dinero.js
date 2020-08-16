import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import normalizeScale from './normalizeScale';
import { lessThanOrEqual as lte } from '../helpers';

function lessThanOrEqual<TAmount, TDinero extends BaseDinero<TAmount>>(
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

    return lte(calculator)(subjectAmount, comparatorAmount);
  };
}

export default lessThanOrEqual;

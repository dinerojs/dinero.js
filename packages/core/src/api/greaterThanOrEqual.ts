import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import normalizeScale from './normalizeScale';

function greaterThanOrEqual<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    | 'greaterThanOrEqual'
    | 'add'
    | 'maximum'
    | 'multiply'
    | 'power'
    | 'subtract'
    | 'round'
    | 'zero'
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

    return calculator.greaterThanOrEqual(subjectAmount, comparatorAmount);
  };
}

export default greaterThanOrEqual;

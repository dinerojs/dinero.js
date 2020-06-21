import { Calculator } from '../calculator';
import { DineroOptions, BaseDinero } from '../types';
import normalizeScale from './normalizeScale';

function greaterThan<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<
    Calculator<TAmount>,
    | 'greaterThan'
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

    return calculator.greaterThan(subjectAmount, comparatorAmount);
  };
}

export default greaterThan;

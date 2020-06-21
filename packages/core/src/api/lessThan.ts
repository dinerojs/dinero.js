import { Calculator } from '../calculator';
import { DineroOptions, BaseDinero } from '../types';
import normalizeScale from './normalizeScale';

function lessThan<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<
    Calculator<TAmount>,
    | 'lessThan'
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

    return calculator.lessThan(subjectAmount, comparatorAmount);
  };
}

export default lessThan;

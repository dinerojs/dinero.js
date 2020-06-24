import { Calculator } from '../calculator';
import { BaseDinero, DineroFactory } from '../types';
import { haveSameAmount, haveSameCurrency } from '.';

function equal<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    | 'add'
    | 'equal'
    | 'maximum'
    | 'multiply'
    | 'power'
    | 'subtract'
    | 'round'
    | 'zero'
  >
) {
  return (dineroObject: TDinero, comparator: TDinero) => {
    return (
      haveSameAmount(dineroFactory, calculator)([dineroObject, comparator]) &&
      haveSameCurrency([dineroObject, comparator])
    );
  };
}

export default equal;

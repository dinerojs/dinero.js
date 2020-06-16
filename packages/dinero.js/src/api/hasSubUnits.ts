import { ChainableDinero, Calculator } from '../types';

function hasSubUnits<TType>(calculator: Calculator<TType>) {
  return (dineroObject: ChainableDinero<TType>) => {
    return !calculator.areEqual(
      calculator.modulo(
        dineroObject.getAmount(),
        calculator.power(
          dineroObject.getCurrency().base,
          dineroObject.getScale()
        )
      ),
      calculator.zero()
    );
  };
}

export default hasSubUnits;

import { ChainableDinero, Calculator } from '../types';

function hasSubUnits<TAmountType>(calculator: Calculator<TAmountType>) {
  return (dineroObject: ChainableDinero<TAmountType>) => {
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

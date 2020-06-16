import { RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';
import toUnit from './toUnit';

function toRoundedUnit<TAmountType>(calculator: Calculator<TAmountType>) {
  return (
    dineroObject: ChainableDinero<TAmountType>,
    digits: TAmountType,
    roundingMode: RoundingMode<TAmountType>
  ) => {
    const factor = calculator.power(dineroObject.getCurrency().base, digits);

    return calculator.divide(
      roundingMode(
        calculator.multiply(toUnit(calculator)(dineroObject), factor)
      ),
      factor
    );
  };
}

export default toRoundedUnit;

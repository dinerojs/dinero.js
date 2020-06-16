import { RoundingMode } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';
import toUnit from './toUnit';

function toRoundedUnit<TType>(calculator: Calculator<TType>) {
  return (
    dineroObject: ChainableDinero<TType>,
    digits: TType,
    roundingMode: RoundingMode<TType>
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

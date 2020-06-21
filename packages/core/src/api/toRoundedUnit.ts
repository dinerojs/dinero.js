import { RoundingMode } from '@dinero.js/core';
import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { toUnit } from '.';

function toRoundedUnit<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<
    Calculator<TAmount>,
    'multiply' | 'divide' | 'power' | 'round'
  >
) {
  return (
    dineroObject: TDinero,
    digits: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) => {
    const { currency } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, digits);

    return calculator.divide(
      roundingMode(
        calculator.multiply(toUnit(calculator)(dineroObject), factor)
      ),
      factor
    );
  };
}

export default toRoundedUnit;

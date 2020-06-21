import { toRoundedUnit, Calculator } from '@dinero.js/core';

function chainableToRoundedUnit<TAmount>(calculator: Calculator<TAmount>) {
  return toRoundedUnit(calculator);
}

export default chainableToRoundedUnit;

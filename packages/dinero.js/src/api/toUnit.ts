import { toUnit, Calculator } from '@dinero.js/core';

function chainableToUnit<TAmount>(calculator: Calculator<TAmount>) {
  return toUnit(calculator);
}

export default chainableToUnit;

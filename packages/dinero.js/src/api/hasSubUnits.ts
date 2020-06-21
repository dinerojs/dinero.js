import { hasSubUnits, Calculator } from '@dinero.js/core';

function chainableHasSubUnits<TAmount>(calculator: Calculator<TAmount>) {
  return hasSubUnits(calculator);
}

export default chainableHasSubUnits;

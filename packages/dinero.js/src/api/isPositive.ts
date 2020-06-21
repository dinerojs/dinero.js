import { isPositive, Calculator } from '@dinero.js/core';

function chainableIsPositive<TAmount>(calculator: Calculator<TAmount>) {
  return isPositive(calculator);
}

export default chainableIsPositive;

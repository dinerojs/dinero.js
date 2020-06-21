import { isNegative, Calculator } from '@dinero.js/core';

function chainableIsPositive<TAmount>(calculator: Calculator<TAmount>) {
  return isNegative(calculator);
}

export default chainableIsPositive;

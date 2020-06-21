import { isZero, Calculator } from '@dinero.js/core';

function chainableIsZero<TAmount>(calculator: Calculator<TAmount>) {
  return isZero(calculator);
}

export default chainableIsZero;

import { toFormat, Calculator } from '@dinero.js/core';

function chainableToFormat<TAmount>(calculator: Calculator<TAmount>) {
  return toFormat(calculator);
}

export default chainableToFormat;

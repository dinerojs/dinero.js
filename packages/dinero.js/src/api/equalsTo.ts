import { equal, Calculator, DineroOptions } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableEqualsTo<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return equal(dineroFactory, calculator);
}

export default chainableEqualsTo;

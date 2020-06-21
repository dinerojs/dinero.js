import { DineroOptions, divide, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableDivide<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return divide(dineroFactory, calculator);
}

export default chainableDivide;

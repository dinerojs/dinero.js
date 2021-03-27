import { Calculator } from '@dinero.js/calculator';
import { Dinero } from '@dinero.js/core';
import {
  Dependencies,
  CalculatorDependency,
} from '@dinero.js/core/src/api/types';
import { dinero } from '../dinero';

/**
 * Create a pure Dinero function from a core function and a calculator.
 *
 * @param fn The core function.
 * @param calculator The calculator.
 *
 * @returns A pure Dinero method.
 */
export function createFunction<
  TAmount,
  TDinero extends Dinero<TAmount>,
  TCalculatorMethods extends keyof Calculator<TAmount>,
  TReturnType
>(
  fn: (
    dependencies: Dependencies<TAmount, TDinero, TCalculatorMethods>
  ) => TReturnType,
  calculator: CalculatorDependency<TAmount, TCalculatorMethods>
) {
  const dependencies = {
    factory: dinero,
    calculator,
  };

  return fn(dependencies as Dependencies<TAmount, TDinero, TCalculatorMethods>);
}

import { Calculator } from '@dinero.js/calculator';
import {
  Dependencies,
  CalculatorDependency,
} from '@dinero.js/core/src/api/types';
import { Dinero } from '../types';
import { dinero } from '../dinero';

/**
 * Create a Dinero function from a core function and a calculator.
 *
 * @param fn The core function.
 * @param calculator The calculator.
 *
 * @returns A Dinero function.
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

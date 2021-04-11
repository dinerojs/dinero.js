import { Calculator } from '@dinero.js/calculator';
import {
  Dependencies,
  CalculatorDependency,
} from '@dinero.js/core/src/api/types';

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
  TCalculatorMethods extends keyof Calculator<TAmount>,
  TReturnType
>(
  fn: (dependencies: Dependencies<TAmount, TCalculatorMethods>) => TReturnType,
  calculator: CalculatorDependency<TAmount, TCalculatorMethods>
) {
  return fn({
    calculator,
  } as Dependencies<TAmount, TCalculatorMethods>);
}

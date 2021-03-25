import { Calculator } from '../../calculator';
import { Dinero, DineroFactory } from '../../types';

export type CalculatorDependency<
  TAmount,
  TCalculatorMethods extends keyof Calculator<TAmount>
> = Pick<Calculator<TAmount>, TCalculatorMethods>;

export type Dependencies<
  TAmount,
  TDinero extends Dinero<TAmount>,
  TCalculatorMethods extends keyof Calculator<TAmount>
> = {
  readonly factory: DineroFactory<TAmount, TDinero>;
  readonly calculator: CalculatorDependency<TAmount, TCalculatorMethods>;
};

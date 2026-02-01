import type { DineroBinaryOperation, DineroUnaryOperation } from '.';

export enum DineroComparisonOperator {
  LT = -1,
  EQ = 0,
  GT = 1,
}

export type DineroCalculator<TInput> = {
  readonly add: DineroBinaryOperation<TInput>;
  readonly compare: DineroBinaryOperation<TInput, DineroComparisonOperator>;
  readonly decrement: DineroUnaryOperation<TInput>;
  readonly integerDivide: DineroBinaryOperation<TInput>;
  readonly increment: DineroUnaryOperation<TInput>;
  readonly modulo: DineroBinaryOperation<TInput>;
  readonly multiply: DineroBinaryOperation<TInput>;
  readonly power: DineroBinaryOperation<TInput>;
  readonly subtract: DineroBinaryOperation<TInput>;
  readonly zero: () => TInput;
};

/* eslint-disable functional/no-mixed-type */
import { BinaryOperation, UnaryOperation, RoundingMode } from '.';

export enum ComparisonOperator {
  LT,
  EQ,
  GT,
}

export type Calculator<TInput> = {
  readonly add: BinaryOperation<TInput>;
  readonly compare: BinaryOperation<TInput, ComparisonOperator>;
  readonly decrement: UnaryOperation<TInput>;
  readonly divide: BinaryOperation<TInput>;
  readonly increment: UnaryOperation<TInput>;
  readonly isOfType: UnaryOperation<TInput, boolean>;
  readonly modulo: BinaryOperation<TInput>;
  readonly multiply: BinaryOperation<TInput>;
  readonly percentage: BinaryOperation<TInput>;
  readonly power: BinaryOperation<TInput>;
  readonly round: RoundingMode<TInput>;
  readonly subtract: BinaryOperation<TInput>;
  readonly zero: () => TInput;
};

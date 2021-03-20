/* eslint-disable functional/no-mixed-type */
import { BinaryOperation, UnaryOperation } from './operations';
import { RoundingMode } from '.';

export enum ComparisonOperator {
  LT,
  EQ,
  GT,
}

export type Calculator<TAmount> = {
  readonly add: BinaryOperation<TAmount>;
  readonly compare: BinaryOperation<TAmount, ComparisonOperator>;
  readonly decrement: UnaryOperation<TAmount>;
  readonly divide: BinaryOperation<TAmount>;
  readonly increment: UnaryOperation<TAmount>;
  readonly isOfType: UnaryOperation<TAmount, boolean>;
  readonly modulo: BinaryOperation<TAmount>;
  readonly multiply: BinaryOperation<TAmount>;
  readonly percentage: BinaryOperation<TAmount>;
  readonly power: BinaryOperation<TAmount>;
  readonly round: RoundingMode<TAmount>;
  readonly subtract: BinaryOperation<TAmount>;
  readonly zero: () => TAmount;
};

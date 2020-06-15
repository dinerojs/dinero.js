/* eslint-disable functional/no-mixed-type */
import {
  BinaryOperation,
  BinaryBooleanOperation,
  VariadicOperation,
  RoundingMode,
} from '@dinero.js/core';

type Calculator<TType> = {
  readonly add: BinaryOperation<TType>;
  readonly areEqual: BinaryBooleanOperation<TType>;
  readonly distribute: (
    value: TType,
    ratios: readonly TType[]
  ) => readonly TType[];
  readonly divide: BinaryOperation<TType>;
  readonly greaterThan: BinaryBooleanOperation<TType>;
  readonly greaterThanOrEqual: BinaryBooleanOperation<TType>;
  readonly lessThan: BinaryBooleanOperation<TType>;
  readonly lessThanOrEqual: BinaryBooleanOperation<TType>;
  readonly maximum: VariadicOperation<TType>;
  readonly minimum: VariadicOperation<TType>;
  readonly modulo: BinaryOperation<TType>;
  readonly multiply: BinaryOperation<TType>;
  readonly percentage: BinaryOperation<TType>;
  readonly power: BinaryOperation<TType>;
  readonly subtract: BinaryOperation<TType>;
  readonly round: RoundingMode<TType>;
  readonly zero: () => TType;
};

export default Calculator;

/* eslint-disable functional/no-mixed-type */
import {
  BinaryOperation,
  BinaryBooleanOperation,
  VariadicOperation,
  RoundingMode,
} from '@dinero.js/core';

type Calculator<TAmountType> = {
  readonly add: BinaryOperation<TAmountType>;
  readonly areEqual: BinaryBooleanOperation<TAmountType>;
  readonly distribute: (
    value: TAmountType,
    ratios: readonly TAmountType[]
  ) => readonly TAmountType[];
  readonly divide: BinaryOperation<TAmountType>;
  readonly greaterThan: BinaryBooleanOperation<TAmountType>;
  readonly greaterThanOrEqual: BinaryBooleanOperation<TAmountType>;
  readonly lessThan: BinaryBooleanOperation<TAmountType>;
  readonly lessThanOrEqual: BinaryBooleanOperation<TAmountType>;
  readonly maximum: VariadicOperation<TAmountType>;
  readonly minimum: VariadicOperation<TAmountType>;
  readonly modulo: BinaryOperation<TAmountType>;
  readonly multiply: BinaryOperation<TAmountType>;
  readonly percentage: BinaryOperation<TAmountType>;
  readonly power: BinaryOperation<TAmountType>;
  readonly subtract: BinaryOperation<TAmountType>;
  readonly round: RoundingMode<TAmountType>;
  readonly zero: () => TAmountType;
};

export default Calculator;

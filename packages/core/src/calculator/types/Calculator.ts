/* eslint-disable functional/no-mixed-type */
import {
  BinaryOperation,
  BinaryBooleanOperation,
  VariadicOperation,
} from './operations';
import { RoundingMode } from '.';

type Calculator<TAmount> = {
  readonly add: BinaryOperation<TAmount>;
  readonly equal: BinaryBooleanOperation<TAmount>;
  readonly distribute: (
    value: TAmount,
    ratios: readonly TAmount[]
  ) => readonly TAmount[];
  readonly divide: BinaryOperation<TAmount>;
  readonly greaterThan: BinaryBooleanOperation<TAmount>;
  readonly greaterThanOrEqual: BinaryBooleanOperation<TAmount>;
  readonly lessThan: BinaryBooleanOperation<TAmount>;
  readonly lessThanOrEqual: BinaryBooleanOperation<TAmount>;
  readonly maximum: VariadicOperation<TAmount>;
  readonly minimum: VariadicOperation<TAmount>;
  readonly modulo: BinaryOperation<TAmount>;
  readonly multiply: BinaryOperation<TAmount>;
  readonly percentage: BinaryOperation<TAmount>;
  readonly power: BinaryOperation<TAmount>;
  readonly subtract: BinaryOperation<TAmount>;
  readonly round: RoundingMode<TAmount>;
  readonly zero: () => TAmount;
  readonly isOfType: (value: number) => boolean;
};

export default Calculator;

import { Calculator } from '@dinero.js/core';
import {
  add,
  distribute,
  equal,
  divide,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  maximum,
  minimum,
  modulo,
  multiply,
  power,
  percentage,
  subtract,
  halfEven,
  zero,
  isOfType,
} from '@dinero.js/core/calculator/number';

const calculator: Calculator<number> = {
  add,
  equal,
  distribute,
  divide,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  maximum,
  minimum,
  modulo,
  multiply,
  percentage,
  power,
  subtract,
  round: halfEven,
  zero,
  isOfType,
};

export default calculator;

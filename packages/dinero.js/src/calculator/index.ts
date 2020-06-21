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
};

export default calculator;

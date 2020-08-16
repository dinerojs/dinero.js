import { Calculator } from '@dinero.js/core';
import {
  add,
  compare,
  decrement,
  divide,
  increment,
  isOfType,
  modulo,
  multiply,
  percentage,
  power,
  halfEven,
  subtract,
  zero,
} from '@dinero.js/core/calculator';

const calculator: Calculator<number> = {
  add,
  compare,
  decrement,
  divide,
  increment,
  isOfType,
  modulo,
  multiply,
  percentage,
  power,
  round: halfEven,
  subtract,
  zero,
};

export default calculator;

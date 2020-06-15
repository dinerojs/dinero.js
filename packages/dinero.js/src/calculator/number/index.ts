import {
  add,
  distribute,
  areEqual,
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
} from '@dinero.js/core/calculator/number';
import { Calculator } from '../../types';

const calculator: Calculator<number> = {
  add,
  areEqual,
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
  zero() {
    return 0;
  },
};

export default calculator;

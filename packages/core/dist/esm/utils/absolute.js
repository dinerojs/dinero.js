import { equal } from './equal';
import { lessThan } from './lessThan';
export function absolute(calculator) {
  var equalFn = equal(calculator);
  var lessThanFn = lessThan(calculator);
  var zero = calculator.zero();
  return function (input) {
    if (equalFn(input, zero)) {
      return zero;
    }
    if (lessThanFn(input, zero)) {
      var minusOne = calculator.decrement(zero);
      return calculator.multiply(minusOne, input);
    }
    return input;
  };
}
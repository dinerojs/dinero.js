import { equal } from './equal';
import { lessThan } from './lessThan';
export function sign(calculator) {
  var equalFn = equal(calculator);
  var lessThanFn = lessThan(calculator);
  var zero = calculator.zero();
  return function (input) {
    if (equalFn(input, zero)) {
      return zero;
    }
    var one = calculator.increment(zero);
    var minusOne = calculator.decrement(zero);
    return lessThanFn(input, zero) ? minusOne : one;
  };
}
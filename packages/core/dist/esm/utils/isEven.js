import { equal } from '.';
export function isEven(calculator) {
  var equalFn = equal(calculator);
  var zero = calculator.zero();
  var two = calculator.increment(calculator.increment(zero));
  return function (input) {
    return equalFn(calculator.modulo(input, two), zero);
  };
}
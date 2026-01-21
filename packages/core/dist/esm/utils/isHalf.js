import { equal, absolute } from '.';
export function isHalf(calculator) {
  var equalFn = equal(calculator);
  var absoluteFn = absolute(calculator);
  return function (input, total) {
    var remainder = absoluteFn(calculator.modulo(input, total));
    var difference = calculator.subtract(total, remainder);
    return equalFn(difference, remainder);
  };
}
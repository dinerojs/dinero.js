import { isArray } from './isArray';
export function computeBase(calculator) {
  return function (base) {
    if (isArray(base)) {
      return base.reduce(function (acc, curr) {
        return calculator.multiply(acc, curr);
      });
    }
    return base;
  };
}
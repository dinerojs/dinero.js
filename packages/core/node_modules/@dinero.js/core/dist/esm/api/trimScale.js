import { computeBase, countTrailingZeros, equal, maximum } from '../utils';
import { transformScale } from './transformScale';
export function trimScale(calculator) {
  var countTrailingZerosFn = countTrailingZeros(calculator);
  var equalFn = equal(calculator);
  var maximumFn = maximum(calculator);
  var transformScaleFn = transformScale(calculator);
  var computeBaseFn = computeBase(calculator);
  return function trimScaleFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount,
      currency = _dineroObject$toJSON.currency,
      scale = _dineroObject$toJSON.scale;
    var base = computeBaseFn(currency.base);
    var trailingZerosLength = countTrailingZerosFn(amount, base);
    var difference = calculator.subtract(scale, trailingZerosLength);
    var newScale = maximumFn([difference, currency.exponent]);
    if (equalFn(newScale, scale)) {
      return dineroObject;
    }
    return transformScaleFn(dineroObject, newScale);
  };
}
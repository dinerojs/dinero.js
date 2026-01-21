import { getAmountAndScale } from '../utils';
import { transformScale } from './transformScale';
export function multiply(calculator) {
  var convertScaleFn = transformScale(calculator);
  var zero = calculator.zero();
  return function multiplyFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var multiplicand = _ref[0],
      multiplier = _ref[1];
    var _multiplicand$toJSON = multiplicand.toJSON(),
      amount = _multiplicand$toJSON.amount,
      currency = _multiplicand$toJSON.currency,
      scale = _multiplicand$toJSON.scale;
    var _getAmountAndScale = getAmountAndScale(multiplier, zero),
      multiplierAmount = _getAmountAndScale.amount,
      multiplierScale = _getAmountAndScale.scale;
    var newScale = calculator.add(scale, multiplierScale);
    return convertScaleFn(multiplicand.create({
      amount: calculator.multiply(amount, multiplierAmount),
      currency: currency,
      scale: newScale
    }), newScale);
  };
}
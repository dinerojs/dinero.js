import { getAmountAndScale, maximum } from '../utils';
import { transformScale } from './transformScale';
export function convert(calculator) {
  var convertScaleFn = transformScale(calculator);
  var maximumFn = maximum(calculator);
  var zero = calculator.zero();
  return function convertFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      newCurrency = _ref[1],
      rates = _ref[2];
    var rate = rates[newCurrency.code];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount,
      scale = _dineroObject$toJSON.scale;
    var _getAmountAndScale = getAmountAndScale(rate, zero),
      rateAmount = _getAmountAndScale.amount,
      rateScale = _getAmountAndScale.scale;
    var newScale = calculator.add(scale, rateScale);
    return convertScaleFn(dineroObject.create({
      amount: calculator.multiply(amount, rateAmount),
      currency: newCurrency,
      scale: newScale
    }), maximumFn([newScale, newCurrency.exponent]));
  };
}
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import { isArray, getDivisors } from '../utils';
export function toUnits(calculator) {
  var getDivisorsFn = getDivisors(calculator);
  return function toUnitsFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      transformer = _ref[1];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount,
      currency = _dineroObject$toJSON.currency,
      scale = _dineroObject$toJSON.scale;
    var power = calculator.power,
      integerDivide = calculator.integerDivide,
      modulo = calculator.modulo;
    var bases = isArray(currency.base) ? currency.base : [currency.base];
    var divisors = getDivisorsFn(bases.map(function (base) {
      return power(base, scale);
    }));
    var value = divisors.reduce(function (amounts, divisor, index) {
      var amountLeft = amounts[index];
      var quotient = integerDivide(amountLeft, divisor);
      var remainder = modulo(amountLeft, divisor);
      return [].concat(_toConsumableArray(amounts.filter(function (_, i) {
        return i !== index;
      })), [quotient, remainder]);
    }, [amount]);
    if (!transformer) {
      return value;
    }
    return transformer({
      value: value,
      currency: currency
    });
  };
}
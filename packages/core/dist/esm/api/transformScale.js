function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { down } from '../divide';
import { computeBase, greaterThan } from '../utils';
export function transformScale(calculator) {
  var greaterThanFn = greaterThan(calculator);
  var computeBaseFn = computeBase(calculator);
  return function transformScaleFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      newScale = _ref[1],
      _ref$ = _ref[2],
      divide = _ref$ === void 0 ? down : _ref$;
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount,
      currency = _dineroObject$toJSON.currency,
      scale = _dineroObject$toJSON.scale;
    var isLarger = greaterThanFn(newScale, scale);
    var operation = isLarger ? calculator.multiply : divide;
    var _ref2 = isLarger ? [newScale, scale] : [scale, newScale],
      _ref3 = _slicedToArray(_ref2, 2),
      a = _ref3[0],
      b = _ref3[1];
    var base = computeBaseFn(currency.base);
    var factor = calculator.power(base, calculator.subtract(a, b));
    return dineroObject.create({
      amount: operation(amount, factor, calculator),
      currency: currency,
      scale: newScale
    });
  };
}
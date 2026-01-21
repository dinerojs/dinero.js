function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { UNEQUAL_CURRENCIES_MESSAGE } from '../checks';
import { assert } from '../helpers';
import { maximum as max } from '../utils';
import { haveSameCurrency } from './haveSameCurrency';
import { normalizeScale } from './normalizeScale';
function unsafeMaximum(calculator) {
  var maxFn = max(calculator);
  return function maximum() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var _dineroObjects = _slicedToArray(dineroObjects, 1),
      firstDinero = _dineroObjects[0];
    var _firstDinero$toJSON = firstDinero.toJSON(),
      currency = _firstDinero$toJSON.currency,
      scale = _firstDinero$toJSON.scale;
    var amount = maxFn(dineroObjects.map(function (subject) {
      var _subject$toJSON = subject.toJSON(),
        subjectAmount = _subject$toJSON.amount;
      return subjectAmount;
    }));
    return firstDinero.create({
      amount: amount,
      currency: currency,
      scale: scale
    });
  };
}
export function safeMaximum(calculator) {
  var normalizeFn = normalizeScale(calculator);
  var maxFn = unsafeMaximum(calculator);
  return function maximum() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var dineroObjects = _ref2[0];
    var condition = haveSameCurrency(dineroObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var normalizedDineroObjects = normalizeFn(dineroObjects);
    return maxFn(normalizedDineroObjects);
  };
}
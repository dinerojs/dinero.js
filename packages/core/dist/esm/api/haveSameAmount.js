function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { equal } from '../utils';
import { normalizeScale } from './normalizeScale';
export function haveSameAmount(calculator) {
  var normalizeFn = normalizeScale(calculator);
  var equalFn = equal(calculator);
  return function _haveSameAmount() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var _normalizeFn = normalizeFn(dineroObjects),
      _normalizeFn2 = _toArray(_normalizeFn),
      firstDinero = _normalizeFn2[0],
      otherDineros = _arrayLikeToArray(_normalizeFn2).slice(1);
    var _firstDinero$toJSON = firstDinero.toJSON(),
      comparatorAmount = _firstDinero$toJSON.amount;
    return otherDineros.every(function (d) {
      var _d$toJSON = d.toJSON(),
        subjectAmount = _d$toJSON.amount;
      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}
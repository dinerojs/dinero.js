function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { computeBase, equal } from '../utils';
export function haveSameCurrency(dineroObjects) {
  var _dineroObjects = _toArray(dineroObjects),
    firstDinero = _dineroObjects[0],
    otherDineros = _arrayLikeToArray(_dineroObjects).slice(1);
  var computeBaseFn = computeBase(firstDinero.calculator);
  var _firstDinero$toJSON = firstDinero.toJSON(),
    comparator = _firstDinero$toJSON.currency;
  var equalFn = equal(firstDinero.calculator);
  var comparatorBase = computeBaseFn(comparator.base);
  return otherDineros.every(function (d) {
    var _d$toJSON = d.toJSON(),
      subject = _d$toJSON.currency;
    var subjectBase = computeBaseFn(subject.base);
    return subject.code === comparator.code && equalFn(subjectBase, comparatorBase) && equalFn(subject.exponent, comparator.exponent);
  });
}
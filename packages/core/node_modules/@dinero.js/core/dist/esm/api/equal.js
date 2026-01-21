import { haveSameAmount } from './haveSameAmount';
import { haveSameCurrency } from './haveSameCurrency';
export function equal(calculator) {
  return function _equal() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    return haveSameAmount(calculator)([dineroObject, comparator]) && haveSameCurrency([dineroObject, comparator]);
  };
}
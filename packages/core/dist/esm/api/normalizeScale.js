import { equal, maximum } from '../utils';
import { transformScale } from './transformScale';
export function normalizeScale(calculator) {
  var maximumFn = maximum(calculator);
  var convertScaleFn = transformScale(calculator);
  var equalFn = equal(calculator);
  return function _normalizeScale() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var highestScale = dineroObjects.reduce(function (highest, current) {
      var _current$toJSON = current.toJSON(),
        scale = _current$toJSON.scale;
      return maximumFn([highest, scale]);
    }, calculator.zero());
    return dineroObjects.map(function (d) {
      var _d$toJSON = d.toJSON(),
        scale = _d$toJSON.scale;
      return !equalFn(scale, highestScale) ? convertScaleFn(d, highestScale) : d;
    });
  };
}
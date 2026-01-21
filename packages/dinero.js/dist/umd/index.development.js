/*! dinero.js 2.0.0-alpha.14 (UNRELEASED 0bf77da) | MIT License | © Sarah Dayan and contributors | https://v2.dinerojs.com */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.dinero = global.dinero || {}, global.dinero.js = {})));
})(this, (function (exports) { 'use strict';

  var INVALID_AMOUNT_MESSAGE = 'Amount is invalid.';
  var INVALID_SCALE_MESSAGE = 'Scale is invalid.';
  var INVALID_RATIOS_MESSAGE = 'Ratios are invalid.';
  var UNEQUAL_CURRENCIES_MESSAGE = 'Objects must have the same currency.';
  var NON_DECIMAL_CURRENCY_MESSAGE = 'Currency is not decimal.';

  /**
   * Assert a condition.
   *
   * @param condition - The condition to verify.
   * @param message - The error message to throw.
   *
   * @throws If the condition isn't met.
   */
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[Dinero.js] ".concat(message));
    }
  }

  function createDinero(_ref) {
    var calculator = _ref.calculator,
      onCreate = _ref.onCreate,
      _ref$formatter = _ref.formatter,
      formatter = _ref$formatter === void 0 ? {
        toNumber: Number,
        toString: String
      } : _ref$formatter;
    return function dinero(_ref2) {
      var amount = _ref2.amount,
        _ref2$currency = _ref2.currency,
        code = _ref2$currency.code,
        base = _ref2$currency.base,
        exponent = _ref2$currency.exponent,
        _ref2$scale = _ref2.scale,
        scale = _ref2$scale === void 0 ? exponent : _ref2$scale;
      var currency = {
        code: code,
        base: base,
        exponent: exponent
      };
      onCreate === null || onCreate === void 0 || onCreate({
        amount: amount,
        currency: currency,
        scale: scale
      });
      return {
        calculator: calculator,
        formatter: formatter,
        create: dinero,
        toJSON: function toJSON() {
          return {
            amount: amount,
            currency: currency,
            scale: scale
          };
        }
      };
    };
  }

  var ComparisonOperator = /*#__PURE__*/function (ComparisonOperator) {
    ComparisonOperator[ComparisonOperator["LT"] = -1] = "LT";
    ComparisonOperator[ComparisonOperator["EQ"] = 0] = "EQ";
    ComparisonOperator[ComparisonOperator["GT"] = 1] = "GT";
    return ComparisonOperator;
  }({});

  /**
   * Returns an equal function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The equal function.
   */
  function equal$2(calculator) {
    return function (subject, comparator) {
      return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
    };
  }

  /**
   * Returns a lessThan function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The lessThan function.
   */
  function lessThan$1(calculator) {
    return function (subject, comparator) {
      return calculator.compare(subject, comparator) === ComparisonOperator.LT;
    };
  }

  function absolute(calculator) {
    var equalFn = equal$2(calculator);
    var lessThanFn = lessThan$1(calculator);
    var zero = calculator.zero();
    return function (input) {
      if (equalFn(input, zero)) {
        return zero;
      }
      if (lessThanFn(input, zero)) {
        var minusOne = calculator.decrement(zero);
        return calculator.multiply(minusOne, input);
      }
      return input;
    };
  }

  /**
   * Returns a compare function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The compare function.
   */
  function compare$2(calculator) {
    return function (subject, comparator) {
      return calculator.compare(subject, comparator);
    };
  }

  function isArray(maybeArray) {
    return Array.isArray(maybeArray);
  }

  function computeBase(calculator) {
    return function (base) {
      if (isArray(base)) {
        return base.reduce(function (acc, curr) {
          return calculator.multiply(acc, curr);
        });
      }
      return base;
    };
  }

  function countTrailingZeros(calculator) {
    var equalFn = equal$2(calculator);
    return function (input, base) {
      var zero = calculator.zero();
      if (equalFn(zero, input)) {
        return calculator.zero();
      }
      var i = zero;
      var temp = input;
      while (equalFn(calculator.modulo(temp, base), zero)) {
        temp = calculator.integerDivide(temp, base);
        i = calculator.increment(i);
      }
      return i;
    };
  }

  /**
   * Returns a greaterThan function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The greaterThan function.
   */
  function greaterThan$1(calculator) {
    return function (subject, comparator) {
      return calculator.compare(subject, comparator) === ComparisonOperator.GT;
    };
  }

  /**
   * Returns a greaterThanOrEqual function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The greaterThanOrEqual function.
   */
  function greaterThanOrEqual$1(calculator) {
    return function (subject, comparator) {
      return greaterThan$1(calculator)(subject, comparator) || equal$2(calculator)(subject, comparator);
    };
  }

  /**
   * Returns a distribute function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The distribute function.
   */
  function distribute(calculator) {
    return function (value, ratios) {
      var equalFn = equal$2(calculator);
      var greaterThanFn = greaterThan$1(calculator);
      var lessThanFn = lessThan$1(calculator);
      var greaterThanOrEqualFn = greaterThanOrEqual$1(calculator);
      var zero = calculator.zero();
      var one = calculator.increment(zero);
      var total = ratios.reduce(function (a, b) {
        return calculator.add(a, b);
      }, zero);
      if (equalFn(total, zero)) {
        return ratios;
      }
      var remainder = value;
      var shares = ratios.map(function (ratio) {
        var share = calculator.integerDivide(calculator.multiply(value, ratio), total) || zero;
        remainder = calculator.subtract(remainder, share);
        return share;
      });
      var isPositive = greaterThanOrEqualFn(value, zero);
      var compare = isPositive ? greaterThanFn : lessThanFn;
      var amount = isPositive ? one : calculator.decrement(zero);
      var i = 0;
      while (compare(remainder, zero)) {
        if (!equalFn(ratios[i], zero)) {
          shares[i] = calculator.add(shares[i], amount);
          remainder = calculator.subtract(remainder, amount);
        }
        i++;
      }
      return shares;
    };
  }

  function isScaledAmount(amount) {
    return amount === null || amount === void 0 ? void 0 : amount.hasOwnProperty('amount');
  }

  function getAmountAndScale(value, zero) {
    if (isScaledAmount(value)) {
      var _value$scale;
      return {
        amount: value.amount,
        scale: (_value$scale = value === null || value === void 0 ? void 0 : value.scale) !== null && _value$scale !== void 0 ? _value$scale : zero
      };
    }
    return {
      amount: value,
      scale: zero
    };
  }

  function _toConsumableArray$1(r) {
    return _arrayWithoutHoles$1(r) || _iterableToArray$3(r) || _unsupportedIterableToArray$d(r) || _nonIterableSpread$1();
  }
  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$d(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$d(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$d(r, a) : void 0;
    }
  }
  function _iterableToArray$3(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _arrayWithoutHoles$1(r) {
    if (Array.isArray(r)) return _arrayLikeToArray$d(r);
  }
  function _arrayLikeToArray$d(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function getDivisors(calculator) {
    var multiply = calculator.multiply;
    return function (bases) {
      return bases.reduce(function (divisors, _, i) {
        var divisor = bases.slice(i).reduce(function (acc, curr) {
          return multiply(acc, curr);
        });
        return [].concat(_toConsumableArray$1(divisors), [divisor]);
      }, []);
    };
  }

  function isEven(calculator) {
    var equalFn = equal$2(calculator);
    var zero = calculator.zero();
    var two = calculator.increment(calculator.increment(zero));
    return function (input) {
      return equalFn(calculator.modulo(input, two), zero);
    };
  }

  function isHalf(calculator) {
    var equalFn = equal$2(calculator);
    var absoluteFn = absolute(calculator);
    return function (input, total) {
      var remainder = absoluteFn(calculator.modulo(input, total));
      var difference = calculator.subtract(total, remainder);
      return equalFn(difference, remainder);
    };
  }

  /**
   * Returns a lessThanOrEqual function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The lessThanOrEqual function.
   */
  function lessThanOrEqual$1(calculator) {
    return function (subject, comparator) {
      return lessThan$1(calculator)(subject, comparator) || equal$2(calculator)(subject, comparator);
    };
  }

  /**
   * Returns a maximum function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The maximum function.
   */
  function maximum$1(calculator) {
    var lessThanFn = lessThan$1(calculator);
    return function (values) {
      return values.reduce(function (acc, curr) {
        return lessThanFn(acc, curr) ? curr : acc;
      });
    };
  }

  /**
   * Returns a minimum function.
   *
   * @param calculator - The calculator to use.
   *
   * @returns The minimum function.
   */
  function minimum$1(calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    return function (values) {
      return values.reduce(function (acc, curr) {
        return greaterThanFn(acc, curr) ? curr : acc;
      });
    };
  }

  function sign(calculator) {
    var equalFn = equal$2(calculator);
    var lessThanFn = lessThan$1(calculator);
    var zero = calculator.zero();
    return function (input) {
      if (equalFn(input, zero)) {
        return zero;
      }
      var one = calculator.increment(zero);
      var minusOne = calculator.decrement(zero);
      return lessThanFn(input, zero) ? minusOne : one;
    };
  }

  function _toArray$1(r) {
    return _arrayWithHoles$b(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$c(r) || _nonIterableRest$b();
  }
  function _nonIterableRest$b() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$c(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$c(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$c(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$c(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArray$2(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _arrayWithHoles$b(r) {
    if (Array.isArray(r)) return r;
  }
  function haveSameCurrency$1(dineroObjects) {
    var _dineroObjects = _toArray$1(dineroObjects),
      firstDinero = _dineroObjects[0],
      otherDineros = _arrayLikeToArray$c(_dineroObjects).slice(1);
    var computeBaseFn = computeBase(firstDinero.calculator);
    var _firstDinero$toJSON = firstDinero.toJSON(),
      comparator = _firstDinero$toJSON.currency;
    var equalFn = equal$2(firstDinero.calculator);
    var comparatorBase = computeBaseFn(comparator.base);
    return otherDineros.every(function (d) {
      var _d$toJSON = d.toJSON(),
        subject = _d$toJSON.currency;
      var subjectBase = computeBaseFn(subject.base);
      return subject.code === comparator.code && equalFn(subjectBase, comparatorBase) && equalFn(subject.exponent, comparator.exponent);
    });
  }

  /**
   * Divide and round down.
   *
   * Rounding down happens whenever the quotient is not an integer.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var down = function down(amount, factor, calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    var equalFn = equal$2(calculator);
    var zero = calculator.zero();
    var isPositive = greaterThanFn(amount, zero);
    var quotient = calculator.integerDivide(amount, factor);
    var remainder = calculator.modulo(amount, factor);
    var isInteger = equalFn(remainder, zero);
    if (isPositive || isInteger) {
      return quotient;
    }
    return calculator.decrement(quotient);
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round away from zero.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfAwayFromZero = function halfAwayFromZero(amount, factor, calculator) {
    var signFn = sign(calculator);
    var isHalfFn = isHalf(calculator);
    var absoluteFn = absolute(calculator);
    if (!isHalfFn(amount, factor)) {
      return halfUp(amount, factor, calculator);
    }
    return calculator.multiply(signFn(amount), up(absoluteFn(amount), factor, calculator));
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round down.
   *
   * Rounding down happens when:
   * - The quotient is half (e.g., -1.5, 1.5).
   * - The quotient is positive and less than half (e.g., 1.4).
   * - The quotient is negative and greater than half (e.g., -1.6).
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfDown = function halfDown(amount, factor, calculator) {
    var isHalfFn = isHalf(calculator);
    if (isHalfFn(amount, factor)) {
      return down(amount, factor, calculator);
    }
    return halfUp(amount, factor, calculator);
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round to the nearest even integer.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfEven = function halfEven(amount, factor, calculator) {
    var isEvenFn = isEven(calculator);
    var isHalfFn = isHalf(calculator);
    var rounded = halfUp(amount, factor, calculator);
    if (!isHalfFn(amount, factor)) {
      return rounded;
    }
    return isEvenFn(rounded) ? rounded : calculator.decrement(rounded);
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round to the nearest odd integer.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfOdd = function halfOdd(amount, factor, calculator) {
    var isEvenFn = isEven(calculator);
    var isHalfFn = isHalf(calculator);
    var rounded = halfUp(amount, factor, calculator);
    if (!isHalfFn(amount, factor)) {
      return rounded;
    }
    return isEvenFn(rounded) ? calculator.decrement(rounded) : rounded;
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round towards zero.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfTowardsZero = function halfTowardsZero(amount, factor, calculator) {
    var signFn = sign(calculator);
    var isHalfFn = isHalf(calculator);
    var absoluteFn = absolute(calculator);
    if (!isHalfFn(amount, factor)) {
      return halfUp(amount, factor, calculator);
    }
    return calculator.multiply(signFn(amount), down(absoluteFn(amount), factor, calculator));
  };

  /**
   * Divide and round towards "nearest neighbor" unless both neighbors are
   * equidistant, in which case round up.
   *
   * Rounding up happens when:
   * - The quotient is half (e.g., -1.5, 1.5).
   * - The quotient is positive and greater than half (e.g., 1.6).
   * - The quotient is negative and less than half (e.g., -1.4).
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var halfUp = function halfUp(amount, factor, calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    var isHalfFn = isHalf(calculator);
    var absoluteFn = absolute(calculator);
    var zero = calculator.zero();
    var remainder = absoluteFn(calculator.modulo(amount, factor));
    var difference = calculator.subtract(factor, remainder);
    var isLessThanHalf = greaterThanFn(difference, remainder);
    var isPositive = greaterThanFn(amount, zero);
    if (isHalfFn(amount, factor) || isPositive && !isLessThanHalf || !isPositive && isLessThanHalf) {
      return up(amount, factor, calculator);
    }
    return down(amount, factor, calculator);
  };

  /**
   * Divide and round up.
   *
   * Rounding up happens whenever the quotient is not an integer.
   *
   * @param amount - The amount to divide.
   * @param factor - The factor to divide by.
   * @param calculator - The calculator to use.
   *
   * @returns The rounded amount.
   */
  var up = function up(amount, factor, calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    var equalFn = equal$2(calculator);
    var zero = calculator.zero();
    var isPositive = greaterThanFn(amount, zero);
    var quotient = calculator.integerDivide(amount, factor);
    var remainder = calculator.modulo(amount, factor);
    var isInteger = equalFn(remainder, zero);
    if (!isInteger && isPositive) {
      return calculator.increment(quotient);
    }
    return quotient;
  };

  function _slicedToArray$9(r, e) {
    return _arrayWithHoles$a(r) || _iterableToArrayLimit$9(r, e) || _unsupportedIterableToArray$b(r, e) || _nonIterableRest$a();
  }
  function _nonIterableRest$a() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$b(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$b(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$b(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$b(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$9(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$a(r) {
    if (Array.isArray(r)) return r;
  }
  function transformScale$1(calculator) {
    var greaterThanFn = greaterThan$1(calculator);
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
        _ref3 = _slicedToArray$9(_ref2, 2),
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

  function normalizeScale$1(calculator) {
    var maximumFn = maximum$1(calculator);
    var convertScaleFn = transformScale$1(calculator);
    var equalFn = equal$2(calculator);
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

  function _slicedToArray$8(r, e) {
    return _arrayWithHoles$9(r) || _iterableToArrayLimit$8(r, e) || _unsupportedIterableToArray$a(r, e) || _nonIterableRest$9();
  }
  function _nonIterableRest$9() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$a(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$a(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$a(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$a(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$8(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$9(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeAdd(calculator) {
    return function add() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var augend = _ref[0],
        addend = _ref[1];
      var _augend$toJSON = augend.toJSON(),
        augendAmount = _augend$toJSON.amount,
        currency = _augend$toJSON.currency,
        scale = _augend$toJSON.scale;
      var _addend$toJSON = addend.toJSON(),
        addendAmount = _addend$toJSON.amount;
      var amount = calculator.add(augendAmount, addendAmount);
      return augend.create({
        amount: amount,
        currency: currency,
        scale: scale
      });
    };
  }
  function safeAdd(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var addFn = unsafeAdd(calculator);
    return function add() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var augend = _ref2[0],
        addend = _ref2[1];
      var condition = haveSameCurrency$1([augend, addend]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([augend, addend]),
        _normalizeFn2 = _slicedToArray$8(_normalizeFn, 2),
        newAugend = _normalizeFn2[0],
        newAddend = _normalizeFn2[1];
      return addFn(newAugend, newAddend);
    };
  }

  function unsafeAllocate(calculator) {
    return function allocate() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        ratios = _ref[1];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        amount = _dineroObject$toJSON.amount,
        currency = _dineroObject$toJSON.currency,
        scale = _dineroObject$toJSON.scale;
      var distributeFn = distribute(calculator);
      var shares = distributeFn(amount, ratios.map(function (ratio) {
        return ratio.amount;
      }));
      return shares.map(function (share) {
        return dineroObject.create({
          amount: share,
          currency: currency,
          scale: scale
        });
      });
    };
  }
  function safeAllocate(calculator) {
    var allocateFn = unsafeAllocate(calculator);
    var greaterThanOrEqualFn = greaterThanOrEqual$1(calculator);
    var greaterThanFn = greaterThan$1(calculator);
    var convertScaleFn = transformScale$1(calculator);
    var maximumFn = maximum$1(calculator);
    var equalFn = equal$2(calculator);
    var zero = calculator.zero();
    var ten = new Array(10).fill(null).reduce(calculator.increment, zero);
    return function allocate() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        ratios = _ref2[1];
      var hasRatios = ratios.length > 0;
      var scaledRatios = ratios.map(function (ratio) {
        return getAmountAndScale(ratio, zero);
      });
      var highestRatioScale = hasRatios ? maximumFn(scaledRatios.map(function (_ref3) {
        var scale = _ref3.scale;
        return scale;
      })) : zero;
      var normalizedRatios = scaledRatios.map(function (_ref4) {
        var amount = _ref4.amount,
          scale = _ref4.scale;
        var factor = equalFn(scale, highestRatioScale) ? zero : calculator.subtract(highestRatioScale, scale);
        return {
          amount: calculator.multiply(amount, calculator.power(ten, factor)),
          scale: scale
        };
      });
      var hasOnlyPositiveRatios = normalizedRatios.every(function (_ref5) {
        var amount = _ref5.amount;
        return greaterThanOrEqualFn(amount, zero);
      });
      var hasOneNonZeroRatio = normalizedRatios.some(function (_ref6) {
        var amount = _ref6.amount;
        return greaterThanFn(amount, zero);
      });
      var condition = hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio;
      assert(condition, INVALID_RATIOS_MESSAGE);
      var _dineroObject$toJSON2 = dineroObject.toJSON(),
        scale = _dineroObject$toJSON2.scale;
      var newScale = calculator.add(scale, highestRatioScale);
      return allocateFn(convertScaleFn(dineroObject, newScale), normalizedRatios);
    };
  }

  function _slicedToArray$7(r, e) {
    return _arrayWithHoles$8(r) || _iterableToArrayLimit$7(r, e) || _unsupportedIterableToArray$9(r, e) || _nonIterableRest$8();
  }
  function _nonIterableRest$8() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$9(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$9(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$9(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$9(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$7(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$8(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeCompare(calculator) {
    var compareFn = compare$2(calculator);
    return function compare() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function (d) {
          var _d$toJSON = d.toJSON(),
            amount = _d$toJSON.amount;
          return amount;
        }),
        _dineroObjects$map2 = _slicedToArray$7(_dineroObjects$map, 2),
        subjectAmount = _dineroObjects$map2[0],
        comparatorAmount = _dineroObjects$map2[1];
      return compareFn(subjectAmount, comparatorAmount);
    };
  }
  function safeCompare(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var compareFn = unsafeCompare(calculator);
    return function compare() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        comparator = _ref2[1];
      var condition = haveSameCurrency$1([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]),
        _normalizeFn2 = _slicedToArray$7(_normalizeFn, 2),
        subjectAmount = _normalizeFn2[0],
        comparatorAmount = _normalizeFn2[1];
      return compareFn(subjectAmount, comparatorAmount);
    };
  }

  function convert$1(calculator) {
    var convertScaleFn = transformScale$1(calculator);
    var maximumFn = maximum$1(calculator);
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

  function _toArray(r) {
    return _arrayWithHoles$7(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$8(r) || _nonIterableRest$7();
  }
  function _nonIterableRest$7() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$8(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$8(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$8(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$8(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArray$1(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _arrayWithHoles$7(r) {
    if (Array.isArray(r)) return r;
  }
  function haveSameAmount$1(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var equalFn = equal$2(calculator);
    return function _haveSameAmount() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var _normalizeFn = normalizeFn(dineroObjects),
        _normalizeFn2 = _toArray(_normalizeFn),
        firstDinero = _normalizeFn2[0],
        otherDineros = _arrayLikeToArray$8(_normalizeFn2).slice(1);
      var _firstDinero$toJSON = firstDinero.toJSON(),
        comparatorAmount = _firstDinero$toJSON.amount;
      return otherDineros.every(function (d) {
        var _d$toJSON = d.toJSON(),
          subjectAmount = _d$toJSON.amount;
        return equalFn(subjectAmount, comparatorAmount);
      });
    };
  }

  function equal$1(calculator) {
    return function _equal() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      return haveSameAmount$1(calculator)([dineroObject, comparator]) && haveSameCurrency$1([dineroObject, comparator]);
    };
  }

  function _slicedToArray$6(r, e) {
    return _arrayWithHoles$6(r) || _iterableToArrayLimit$6(r, e) || _unsupportedIterableToArray$7(r, e) || _nonIterableRest$6();
  }
  function _nonIterableRest$6() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$7(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$7(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$7(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$7(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$6(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$6(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeGreaterThan(calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    return function greaterThan() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function (d) {
          var _d$toJSON = d.toJSON(),
            amount = _d$toJSON.amount;
          return amount;
        }),
        _dineroObjects$map2 = _slicedToArray$6(_dineroObjects$map, 2),
        subjectAmount = _dineroObjects$map2[0],
        comparatorAmount = _dineroObjects$map2[1];
      return greaterThanFn(subjectAmount, comparatorAmount);
    };
  }
  function safeGreaterThan(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var greaterThanFn = unsafeGreaterThan(calculator);
    return function greaterThan() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        comparator = _ref2[1];
      var condition = haveSameCurrency$1([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]),
        _normalizeFn2 = _slicedToArray$6(_normalizeFn, 2),
        subjectAmount = _normalizeFn2[0],
        comparatorAmount = _normalizeFn2[1];
      return greaterThanFn(subjectAmount, comparatorAmount);
    };
  }

  function _slicedToArray$5(r, e) {
    return _arrayWithHoles$5(r) || _iterableToArrayLimit$5(r, e) || _unsupportedIterableToArray$6(r, e) || _nonIterableRest$5();
  }
  function _nonIterableRest$5() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$6(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$6(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$6(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$6(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$5(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$5(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeGreaterThanOrEqual(calculator) {
    var greaterThanOrEqualFn = greaterThanOrEqual$1(calculator);
    return function greaterThanOrEqual() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function (d) {
          var _d$toJSON = d.toJSON(),
            amount = _d$toJSON.amount;
          return amount;
        }),
        _dineroObjects$map2 = _slicedToArray$5(_dineroObjects$map, 2),
        subjectAmount = _dineroObjects$map2[0],
        comparatorAmount = _dineroObjects$map2[1];
      return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function safeGreaterThanOrEqual(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator);
    return function greaterThanOrEqual() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        comparator = _ref2[1];
      var condition = haveSameCurrency$1([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]),
        _normalizeFn2 = _slicedToArray$5(_normalizeFn, 2),
        subjectAmount = _normalizeFn2[0],
        comparatorAmount = _normalizeFn2[1];
      return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }

  function hasSubUnits$1(calculator) {
    var equalFn = equal$2(calculator);
    var computeBaseFn = computeBase(calculator);
    return function _hasSubUnits() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        amount = _dineroObject$toJSON.amount,
        currency = _dineroObject$toJSON.currency,
        scale = _dineroObject$toJSON.scale;
      var base = computeBaseFn(currency.base);
      return !equalFn(calculator.modulo(amount, calculator.power(base, scale)), calculator.zero());
    };
  }

  function isNegative$1(calculator) {
    var lessThanFn = lessThan$1(calculator);
    return function _isNegative() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        amount = _dineroObject$toJSON.amount;
      return lessThanFn(amount, calculator.zero());
    };
  }

  function isPositive$1(calculator) {
    var greaterThanFn = greaterThan$1(calculator);
    return function _isPositive() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        amount = _dineroObject$toJSON.amount;
      return greaterThanFn(amount, calculator.zero());
    };
  }

  function isZero$1(calculator) {
    var equalFn = equal$2(calculator);
    return function _isZero() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        amount = _dineroObject$toJSON.amount;
      return equalFn(amount, calculator.zero());
    };
  }

  function _slicedToArray$4(r, e) {
    return _arrayWithHoles$4(r) || _iterableToArrayLimit$4(r, e) || _unsupportedIterableToArray$5(r, e) || _nonIterableRest$4();
  }
  function _nonIterableRest$4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$5(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$5(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$5(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$5(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$4(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$4(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeLessThan(calculator) {
    var lessThanFn = lessThan$1(calculator);
    return function lessThan() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function (d) {
          var _d$toJSON = d.toJSON(),
            amount = _d$toJSON.amount;
          return amount;
        }),
        _dineroObjects$map2 = _slicedToArray$4(_dineroObjects$map, 2),
        subjectAmount = _dineroObjects$map2[0],
        comparatorAmount = _dineroObjects$map2[1];
      return lessThanFn(subjectAmount, comparatorAmount);
    };
  }
  function safeLessThan(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var lessThanFn = unsafeLessThan(calculator);
    return function lessThan() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        comparator = _ref2[1];
      var condition = haveSameCurrency$1([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]),
        _normalizeFn2 = _slicedToArray$4(_normalizeFn, 2),
        subjectAmount = _normalizeFn2[0],
        comparatorAmount = _normalizeFn2[1];
      return lessThanFn(subjectAmount, comparatorAmount);
    };
  }

  function _slicedToArray$3(r, e) {
    return _arrayWithHoles$3(r) || _iterableToArrayLimit$3(r, e) || _unsupportedIterableToArray$4(r, e) || _nonIterableRest$3();
  }
  function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$4(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$4(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$4(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$4(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$3(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$3(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeLessThanOrEqual(calculator) {
    var lessThanOrEqualFn = lessThanOrEqual$1(calculator);
    return function lessThanOrEqual() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function (d) {
          var _d$toJSON = d.toJSON(),
            amount = _d$toJSON.amount;
          return amount;
        }),
        _dineroObjects$map2 = _slicedToArray$3(_dineroObjects$map, 2),
        subjectAmount = _dineroObjects$map2[0],
        comparatorAmount = _dineroObjects$map2[1];
      return lessThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function safeLessThanOrEqual(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var lessThanOrEqualFn = unsafeLessThanOrEqual(calculator);
    return function lessThanOrEqual() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0],
        comparator = _ref2[1];
      var condition = haveSameCurrency$1([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]),
        _normalizeFn2 = _slicedToArray$3(_normalizeFn, 2),
        subjectAmount = _normalizeFn2[0],
        comparatorAmount = _normalizeFn2[1];
      return lessThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }

  function _slicedToArray$2(r, e) {
    return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest$2();
  }
  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$3(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$3(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$2(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$2(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeMaximum(calculator) {
    var maxFn = maximum$1(calculator);
    return function maximum() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var _dineroObjects = _slicedToArray$2(dineroObjects, 1),
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
  function safeMaximum(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var maxFn = unsafeMaximum(calculator);
    return function maximum() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObjects = _ref2[0];
      var condition = haveSameCurrency$1(dineroObjects);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var normalizedDineroObjects = normalizeFn(dineroObjects);
      return maxFn(normalizedDineroObjects);
    };
  }

  function _slicedToArray$1(r, e) {
    return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$1();
  }
  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$2(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$2(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit$1(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles$1(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeMinimum(calculator) {
    var minFn = minimum$1(calculator);
    return function minimum() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var _dineroObjects = _slicedToArray$1(dineroObjects, 1),
        firstDinero = _dineroObjects[0];
      var _firstDinero$toJSON = firstDinero.toJSON(),
        currency = _firstDinero$toJSON.currency,
        scale = _firstDinero$toJSON.scale;
      var amount = minFn(dineroObjects.map(function (subject) {
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
  function safeMinimum(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var minFn = unsafeMinimum(calculator);
    return function maximum() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObjects = _ref2[0];
      var condition = haveSameCurrency$1(dineroObjects);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var normalizedDineroObjects = normalizeFn(dineroObjects);
      return minFn(normalizedDineroObjects);
    };
  }

  function multiply$2(calculator) {
    var convertScaleFn = transformScale$1(calculator);
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

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray$1(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
    }
  }
  function _arrayLikeToArray$1(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function unsafeSubtract(calculator) {
    return function subtract() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var minuend = _ref[0],
        subtrahend = _ref[1];
      var _minuend$toJSON = minuend.toJSON(),
        minuendAmount = _minuend$toJSON.amount,
        currency = _minuend$toJSON.currency,
        scale = _minuend$toJSON.scale;
      var _subtrahend$toJSON = subtrahend.toJSON(),
        subtrahendAmount = _subtrahend$toJSON.amount;
      var amount = calculator.subtract(minuendAmount, subtrahendAmount);
      return minuend.create({
        amount: amount,
        currency: currency,
        scale: scale
      });
    };
  }
  function safeSubtract(calculator) {
    var normalizeFn = normalizeScale$1(calculator);
    var subtractFn = unsafeSubtract(calculator);
    return function subtract() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var minuend = _ref2[0],
        subtrahend = _ref2[1];
      var condition = haveSameCurrency$1([minuend, subtrahend]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([minuend, subtrahend]),
        _normalizeFn2 = _slicedToArray(_normalizeFn, 2),
        newMinuend = _normalizeFn2[0],
        newSubtrahend = _normalizeFn2[1];
      return subtractFn(newMinuend, newSubtrahend);
    };
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function toUnits$1(calculator) {
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

  function toDecimal$1(calculator) {
    var toUnitsFn = toUnits$1(calculator);
    var computeBaseFn = computeBase(calculator);
    var equalFn = equal$2(calculator);
    return function toDecimalFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0],
        transformer = _ref[1];
      var _dineroObject$toJSON = dineroObject.toJSON(),
        currency = _dineroObject$toJSON.currency,
        scale = _dineroObject$toJSON.scale;
      var base = computeBaseFn(currency.base);
      var zero = calculator.zero();
      var ten = new Array(10).fill(null).reduce(calculator.increment, zero);
      var isMultiBase = isArray(currency.base);
      var isBaseTen = equalFn(calculator.modulo(base, ten), zero);
      var isDecimal = !isMultiBase && isBaseTen;
      assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);
      var units = toUnitsFn(dineroObject);
      var getDecimalFn = getDecimal(calculator, dineroObject.formatter);
      var value = getDecimalFn(units, scale);
      if (!transformer) {
        return value;
      }
      return transformer({
        value: value,
        currency: currency
      });
    };
  }
  function getDecimal(calculator, formatter) {
    var absoluteFn = absolute(calculator);
    var equalFn = equal$2(calculator);
    var lessThanFn = lessThan$1(calculator);
    var zero = calculator.zero();
    return function (units, scale) {
      var whole = formatter.toString(units[0]);
      var fractional = formatter.toString(absoluteFn(units[1]));
      var scaleNumber = formatter.toNumber(scale);
      var decimal = "".concat(whole, ".").concat(fractional.padStart(scaleNumber, '0'));
      var leadsWithZero = equalFn(units[0], zero);
      var isNegative = lessThanFn(units[1], zero);

      // A leading negative zero is a special case because the `toString`
      // formatter won't preserve its negative sign (since 0 === -0).
      return leadsWithZero && isNegative ? "-".concat(decimal) : decimal;
    };
  }

  function toSnapshot$1(dineroObject) {
    return dineroObject.toJSON();
  }

  function trimScale$1(calculator) {
    var countTrailingZerosFn = countTrailingZeros(calculator);
    var equalFn = equal$2(calculator);
    var maximumFn = maximum$1(calculator);
    var transformScaleFn = transformScale$1(calculator);
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

  /**
   * Add up the passed Dinero objects.
   *
   * @param augend - The Dinero object to add to.
   * @param addend - The Dinero object to add.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function add$1() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var augend = _ref[0],
      addend = _ref[1];
    var calculator = augend.calculator;
    var addFn = safeAdd(calculator);
    return addFn(augend, addend);
  }

  /**
   * Distribute the amount of a Dinero object across a list of ratios.
   *
   * @param dineroObject - The Dinero object to allocate from.
   * @param ratios - The ratios to allocate the amount to.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function allocate() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      ratios = _ref[1];
    var calculator = dineroObject.calculator;
    var allocateFn = safeAllocate(calculator);
    return allocateFn(dineroObject, ratios);
  }

  /**
   * Compare the value of a Dinero object relative to another.
   *
   * @param dineroObject - The Dinero object to compare.
   * @param comparator - The Dinero object to compare to.
   *
   * @returns One of -1, 0, or 1 depending on whether the first Dinero object is less than, equal to, or greater than the other.
   *
   * @public
   */
  function compare$1() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var compareFn = safeCompare(calculator);
    return compareFn(dineroObject, comparator);
  }

  /**
   * Convert a Dinero object to another currency.
   *
   * @param dineroObject - The Dinero object to format.
   * @param newCurrency - The currency to convert to.
   * @param rates - The rates to convert with.
   *
   * @returns A converted Dinero object.
   *
   * @public
   */
  function convert() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      newCurrency = _ref[1],
      rates = _ref[2];
    var calculator = dineroObject.calculator;
    var converter = convert$1(calculator);
    return converter(dineroObject, newCurrency, rates);
  }

  /**
   * Check whether the value of a Dinero object is equal to another.
   *
   * @param dineroObject - The first Dinero object to compare.
   * @param comparator - The second Dinero object to compare.
   *
   * @returns Whether the Dinero objects are equal.
   *
   * @public
   */
  function equal() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var equalFn = equal$1(calculator);
    return equalFn(dineroObject, comparator);
  }

  /**
   * Check whether the value of a Dinero object is greater than another.
   *
   * @param dineroObject - The Dinero object to compare.
   * @param comparator - The Dinero object to compare to.
   *
   * @returns Whether the Dinero to compare is greater than the other.
   *
   * @public
   */
  function greaterThan() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var greaterThanFn = safeGreaterThan(calculator);
    return greaterThanFn(dineroObject, comparator);
  }

  /**
   * Check whether the value of a Dinero object is greater than or equal another.
   *
   * @param dineroObject - The Dinero object to compare.
   * @param comparator - The Dinero object to compare to.
   *
   * @returns Whether the Dinero to compare is greater than or equal the other.
   *
   * @public
   */
  function greaterThanOrEqual() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator);
    return greaterThanOrEqualFn(dineroObject, comparator);
  }

  /**
   * Check whether a Dinero object has minor currency units.
   *
   * @param dineroObject - The Dinero object to check.
   *
   * @returns Whether the Dinero object has minor currency units.
   *
   * @public
   */
  function hasSubUnits() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator = dineroObject.calculator;
    var hasSubUnitsFn = hasSubUnits$1(calculator);
    return hasSubUnitsFn(dineroObject);
  }

  /**
   * Check whether a set of Dinero objects have the same amount.
   *
   * @param dineroObjects - The Dinero objects to compare.
   *
   * @returns Whether the Dinero objects have the same amount.
   *
   * @public
   */
  function haveSameAmount() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator = dineroObjects[0].calculator;
    var haveSameAmountFn = haveSameAmount$1(calculator);
    return haveSameAmountFn(dineroObjects);
  }

  /**
   * Check whether a set of Dinero objects have the same currency.
   *
   * @param dineroObjects - The Dinero objects to compare.
   *
   * @returns Whether the Dinero objects have the same currency.
   *
   * @public
   */
  var haveSameCurrency = haveSameCurrency$1;

  /**
   * Check whether a Dinero object is negative.
   *
   * @param dineroObject - The Dinero object to check.
   *
   * @returns Whether the Dinero object is negative.
   *
   * @public
   */
  function isNegative() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator = dineroObject.calculator;
    var isNegativeFn = isNegative$1(calculator);
    return isNegativeFn(dineroObject);
  }

  /**
   * Check whether a Dinero object is positive.
   *
   * @param dineroObject - The Dinero object to check.
   *
   * @returns Whether the Dinero object is positive.
   *
   * @public
   */
  function isPositive() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator = dineroObject.calculator;
    var isPositiveFn = isPositive$1(calculator);
    return isPositiveFn(dineroObject);
  }

  /**
   * Check whether the value of a Dinero object is zero.
   *
   * @param dineroObject - The Dinero object to check.
   *
   * @returns Whether the value of a Dinero object is zero.
   *
   * @public
   */
  function isZero() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator = dineroObject.calculator;
    var isZeroFn = isZero$1(calculator);
    return isZeroFn(dineroObject);
  }

  /**
   * Check whether the value of a Dinero object is lesser than another.
   *
   * @param dineroObject - The Dinero object to compare.
   * @param comparator - The Dinero object to compare to.
   *
   * @returns Whether the Dinero to compare is lesser than the other.
   *
   * @public
   */
  function lessThan() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var lessThanFn = safeLessThan(calculator);
    return lessThanFn(dineroObject, comparator);
  }

  /**
   * Check whether the value of a Dinero object is lesser than or equal to another.
   *
   * @param dineroObject - The Dinero object to compare.
   * @param comparator - The Dinero object to compare to.
   *
   * @returns Whether the Dinero to compare is lesser than or equal to the other.
   *
   * @public
   */
  function lessThanOrEqual() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      comparator = _ref[1];
    var calculator = dineroObject.calculator;
    var lessThanOrEqualFn = safeLessThanOrEqual(calculator);
    return lessThanOrEqualFn(dineroObject, comparator);
  }

  /**
   * Get the greatest of the passed Dinero objects.
   *
   * @param dineroObjects - The Dinero objects to maximum.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function maximum() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator = dineroObjects[0].calculator;
    var maximumFn = safeMaximum(calculator);
    return maximumFn(dineroObjects);
  }

  /**
   * Get the lowest of the passed Dinero objects.
   *
   * @param dineroObjects - The Dinero objects to minimum.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function minimum() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator = dineroObjects[0].calculator;
    var minimumFn = safeMinimum(calculator);
    return minimumFn(dineroObjects);
  }

  /**
   * Multiply the passed Dinero object.
   *
   * @param multiplicand - The Dinero object to multiply.
   * @param multiplier - The number to multiply with.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function multiply$1() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var multiplicand = _ref[0],
      multiplier = _ref[1];
    var calculator = multiplicand.calculator;
    var multiplyFn = multiply$2(calculator);
    return multiplyFn(multiplicand, multiplier);
  }

  /**
   * Normalize a set of Dinero objects to the highest scale of the set.
   *
   * @param dineroObjects - The Dinero objects to normalize.
   *
   * @returns A new set of Dinero objects.
   *
   * @public
   */
  function normalizeScale() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator = dineroObjects[0].calculator;
    var normalizeScaleFn = normalizeScale$1(calculator);
    return normalizeScaleFn(dineroObjects);
  }

  /**
   * Subtract the passed Dinero objects.
   *
   * @param minuend - The Dinero object to subtract from.
   * @param subtrahend - The Dinero object to subtract.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function subtract$1() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var minuend = _ref[0],
      subtrahend = _ref[1];
    var calculator = minuend.calculator;
    var subtractFn = safeSubtract(calculator);
    return subtractFn(minuend, subtrahend);
  }

  /**
   * Get the amount of a Dinero object in decimal form.
   *
   * @param dineroObject - The Dinero object to format.
   * @param transformer - A transformer function.
   *
   * @returns The amount in decimal form.
   *
   * @public
   */
  function toDecimal() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      transformer = _ref[1];
    var calculator = dineroObject.calculator;
    var toDecimalFn = toDecimal$1(calculator);
    return toDecimalFn(dineroObject, transformer);
  }

  /**
   * Get a snapshot of a Dinero object.
   *
   * @param dineroObject - The Dinero object to format.
   * @param transformer - A transformer function.
   *
   * @returns A snapshot of the object.
   *
   * @public
   */
  var toSnapshot = toSnapshot$1;

  /**
   * Get the amount of a Dinero object in units.
   *
   * @param dineroObject - The Dinero object to format.
   * @param transformer - A transformer function.
   *
   * @returns The amount in units.
   *
   * @public
   */
  function toUnits() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      transformer = _ref[1];
    var calculator = dineroObject.calculator;
    var toUnitsFn = toUnits$1(calculator);
    return toUnitsFn(dineroObject, transformer);
  }

  /**
   * Transform a Dinero object to a new scale.
   *
   * @param dineroObject - The Dinero object to transform.
   * @param newScale - The new scale.
   * @param divide - A custom divide function.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function transformScale() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0],
      newScale = _ref[1],
      divide = _ref[2];
    var calculator = dineroObject.calculator;
    var transformScaleFn = transformScale$1(calculator);
    return transformScaleFn(dineroObject, newScale, divide);
  }

  /**
   * Trim a Dinero object's scale as much as possible, down to the currency exponent.
   *
   * @param dineroObject - The Dinero object which scale to trim.
   *
   * @returns A new Dinero object.
   *
   * @public
   */
  function trimScale() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator = dineroObject.calculator;
    var trimScaleFn = trimScale$1(calculator);
    return trimScaleFn(dineroObject);
  }

  /**
   * Returns the sum of two numbers.
   *
   * @param augend - The number to add to.
   * @param addend - The number to add.
   *
   * @returns The sum of the two numbers.
   */
  var add = function add(augend, addend) {
    return augend + addend;
  };

  /**
   * Compare two numbers.
   *
   * @param a - The first number to compare.
   * @param b - The second number to compare.
   *
   * @returns Whether the two numbers are equal, or whether the first one is greater or less than the other.
   */
  var compare = function compare(a, b) {
    if (a < b) {
      return ComparisonOperator.LT;
    }
    if (a > b) {
      return ComparisonOperator.GT;
    }
    return ComparisonOperator.EQ;
  };

  /**
   * Returns an decremented number.
   *
   * @param value - The number to decrement.
   *
   * @returns The decremented number.
   */
  var decrement = function decrement(value) {
    return value - 1;
  };

  /**
   * Returns an incremented number.
   *
   * @param value - The number to increment.
   *
   * @returns The incremented number.
   */
  var increment = function increment(value) {
    return value + 1;
  };

  /**
   * Returns the quotient of two numbers with no fractional part.
   *
   * @param dividend - The number to divide.
   * @param divisor - The number to divide with.
   *
   * @returns The quotient of the two numbers.
   */
  var integerDivide = function integerDivide(dividend, divisor) {
    return Math.trunc(dividend / divisor);
  };

  /**
   * Returns the remainder of two numbers.
   *
   * @param dividend - The number to divide.
   * @param divisor - The number to divide with.
   *
   * @returns The remainder of the two numbers.
   */
  var modulo = function modulo(dividend, divisor) {
    return dividend % divisor;
  };

  /**
   * Returns the product of two numbers.
   *
   * @param multiplicand - The number to multiply.
   * @param multiplier - The number to multiply with.
   *
   * @returns The product of the two numbers.
   */
  var multiply = function multiply(multiplicand, multiplier) {
    return multiplicand * multiplier;
  };

  /**
   * Returns an number to the power of an exponent.
   *
   * @param base - The base number.
   * @param exponent - The exponent to raise the base to.
   *
   * @returns The base to the power of the exponent.
   */
  var power = function power(base, exponent) {
    return Math.pow(base, exponent);
  };

  /**
   * Returns the difference between two numbers.
   *
   * @param minuend - The number to subtract from.
   * @param subtrahend - The number to subtract.
   *
   * @returns The difference of the two numbers.
   */
  var subtract = function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
  };

  /**
   * Return zero as a number.
   *
   * @returns Zero as a number.
   */
  function zero() {
    return 0;
  }

  var calculator = {
    add: add,
    compare: compare,
    decrement: decrement,
    increment: increment,
    integerDivide: integerDivide,
    modulo: modulo,
    multiply: multiply,
    power: power,
    subtract: subtract,
    zero: zero
  };

  /**
   * Create a Dinero object.
   *
   * @param options.amount - The amount in minor currency units.
   * @param options.currency - The currency.
   * @param options.scale - The number of decimal places to represent.
   *
   * @returns The created Dinero object.
   *
   * @public
   */
  var dinero = createDinero({
    calculator: calculator,
    onCreate: function onCreate(_ref) {
      var amount = _ref.amount,
        scale = _ref.scale;
      assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
      assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
    }
  });

  exports.add = add$1;
  exports.allocate = allocate;
  exports.compare = compare$1;
  exports.convert = convert;
  exports.createDinero = createDinero;
  exports.dinero = dinero;
  exports.down = down;
  exports.equal = equal;
  exports.greaterThan = greaterThan;
  exports.greaterThanOrEqual = greaterThanOrEqual;
  exports.halfAwayFromZero = halfAwayFromZero;
  exports.halfDown = halfDown;
  exports.halfEven = halfEven;
  exports.halfOdd = halfOdd;
  exports.halfTowardsZero = halfTowardsZero;
  exports.halfUp = halfUp;
  exports.hasSubUnits = hasSubUnits;
  exports.haveSameAmount = haveSameAmount;
  exports.haveSameCurrency = haveSameCurrency;
  exports.isNegative = isNegative;
  exports.isPositive = isPositive;
  exports.isZero = isZero;
  exports.lessThan = lessThan;
  exports.lessThanOrEqual = lessThanOrEqual;
  exports.maximum = maximum;
  exports.minimum = minimum;
  exports.multiply = multiply$1;
  exports.normalizeScale = normalizeScale;
  exports.subtract = subtract$1;
  exports.toDecimal = toDecimal;
  exports.toSnapshot = toSnapshot;
  exports.toUnits = toUnits;
  exports.transformScale = transformScale;
  exports.trimScale = trimScale;
  exports.up = up;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.development.js.map

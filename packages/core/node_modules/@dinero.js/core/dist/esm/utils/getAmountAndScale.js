import { isScaledAmount } from './isScaledAmount';
export function getAmountAndScale(value, zero) {
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
export function isScaledAmount(amount) {
  return amount === null || amount === void 0 ? void 0 : amount.hasOwnProperty('amount');
}
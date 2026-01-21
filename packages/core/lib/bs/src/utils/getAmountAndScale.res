open ScaledAmount
open IsScaledAmount

/**
 * Extracts amount and scale from a value.
 *
 * @param value - The value to extract from.
 * @param zero - The zero value to use as default scale.
 *
 * @returns An object with amount and scale.
 */
let getAmountAndScale = (value: 'amount, zero: float) => {
  let maybeScaled = fromValue(value)
  switch maybeScaled {
  | ScaledAmount(scaledValue) => {
      \"amount": scaledValue.amount,
      \"scale": scaledValue.scale->Option.getUnsafe
    }
  | Amount(plainValue) => {
      \"amount": plainValue,
      \"scale": zero
    }
  }
}
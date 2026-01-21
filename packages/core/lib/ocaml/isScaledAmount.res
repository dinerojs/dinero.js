open ScaledAmount

/**
 * Represents either a ScaledAmount object or a plain amount value
 */
type maybeScaledAmount<'a> = ScaledAmount(scaledAmount<'a>) | Amount('a)

/**
 * Checks if a value is a ScaledAmount.
 *
 * @param value - The maybeScaledAmount to check.
 *
 * @returns Whether the value is a ScaledAmount.
 */
let isScaledAmount = (value: maybeScaledAmount<'amount>) => {
  switch value {
  | ScaledAmount(_) => true
  | Amount(_) => false
  }
}

/**
 * Helper function to create maybeScaledAmount from JavaScript values
 * This handles the dynamic typing from JavaScript values
 */
let fromValue = (value: 'a): maybeScaledAmount<'b> => {
  switch Type.typeof(value) {
  | #object => {
      switch value {
      | JSON.Object(dict{"amount": JSON.Number(amount), "scale": JSON.Number(scale)}) => {
        ScaledAmount({ amount, scale})
      }
      | JSON.Object(dict{"amount": JSON.Number(amount)}) => {
        ScaledAmount({ amount, scale: 0.0 })
      }
      | _ => Amount(Obj.magic(value))
      }
    }
  | #number => Amount(Obj.magic(value))
  | _ => JsError.throwWithMessage("Expected either a number or a scaled amount")
  }
}
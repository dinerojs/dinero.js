open Calculator
open IsArray

/**
 * Computes the base value from either a single amount or array of amounts.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The computeBase function.
 */
let computeBase = (calculator: calculator<'amount>) => {
  (base: [#Single('amount) | #Array(array<'amount>)]) => {
    switch base {
    | #Single(value) => value
    | #Array(baseArray) =>
      switch baseArray[0] {
      | Some(first) => {
          let rest = Js.Array.sliceFrom(1, baseArray)
          Js.Array.reduce((acc, curr) => calculator.multiply(acc, curr), first, rest)
        }
      | None => JsError.throwWithMessage("baseArray is empty")
      }
    }
  }
}

/**
 * Helper function to create polymorphic variant from a value that could be single or array
 */
let fromValue = (value: 'a): [#Single('b) | #Array(array<'b>)] => {
  if isArray(value) {
    #Array((Obj.magic(value): array<'b>))
  } else {
    #Single((Obj.magic(value): 'b))
  }
}

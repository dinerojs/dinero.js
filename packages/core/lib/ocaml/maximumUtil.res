open Calculator
open LessThanUtil

/**
 * Returns a maximum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The maximum function.
 */
let maximum = (calculator: calculator<'amount>) => {
  let lessThanFn = lessThan(calculator)

  (values: array<'amount>) => {
    switch values[0] {
      | Some(first) => Js.Array.reduce((acc, curr) => {
        if lessThanFn(acc, curr) { curr } else { acc }
      }, first, values->Array.slice(~start=1))
      | None => JsError.throwWithMessage("Cannot find maximum of empty array")
    }
  }
}
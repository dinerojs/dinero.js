open Calculator
open GreaterThanUtil

/**
 * Returns a minimum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The minimum function.
 */
let minimum = (calculator: calculator<'amount>) => {
  let greaterThanFn = greaterThan(calculator)

  (values: array<'amount>) => {
    switch values[0] {
      | Some(first) => Js.Array.reduce((acc, curr) => {
        if greaterThanFn(acc, curr) { curr } else { acc }
      }, first, values->Array.slice(~start=1))
      | None => JsError.throwWithMessage("Cannot find minimum of empty array")
    }
  }
}
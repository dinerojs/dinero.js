open Calculator

/**
 * Gets divisors for bases array.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The getDivisors function.
 */
let getDivisors = (calculator: calculator<'amount>) => {
  (bases: array<'amount>) => {
    bases->Array.reduceWithIndex([], (divisors, _, i) => {
      let slice = bases->Array.slice(~start=i)
      switch slice[0] {
      | Some(first) => {
          let rest = slice->Array.slice(~start=1)
          let divisor = rest->Array.reduce(first, (acc, curr) => calculator.multiply(acc, curr))
          divisors->Array.concat([divisor])
        }
      | None => divisors
      }
    })
  }
}
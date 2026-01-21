open Calculator
open EqualUtil
open GreaterThanUtil
open LessThanUtil
open GreaterThanOrEqualUtil

/**
 * Returns a distribute function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The distribute function.
 */
let distribute = (calculator: calculator<'amount>) => {
  (value: 'amount, ratios: array<'amount>) => {
    let equalFn = equal(calculator)
    let greaterThanFn = greaterThan(calculator)
    let lessThanFn = lessThan(calculator)
    let greaterThanOrEqualFn = greaterThanOrEqual(calculator)

    let zero = calculator.zero()
    let one = calculator.increment(zero)

    let total = Js.Array.reduce((a, b) => calculator.add(a, b), zero, ratios)

    if equalFn(total, zero) {
      ratios
    } else {
      let remainder = ref(value)

      // Calculate initial shares 
      let shares = ref(Js.Array.map(ratio => {
        let share = calculator.integerDivide(calculator.multiply(value, ratio), total)
        remainder := calculator.subtract(remainder.contents, share)
        share
      }, ratios))

      let isPositive = greaterThanOrEqualFn(value, zero)
      let compare = if isPositive { greaterThanFn } else { lessThanFn }
      let amount = if isPositive { one } else { calculator.decrement(zero) }

      // Distribute remainder - with proper looping
      let i = ref(0)
      while compare(remainder.contents, zero) {
        let currentIndex = mod(i.contents, Array.length(ratios))
        let ratio = ratios[currentIndex]->Option.getOr(zero)
        if !equalFn(ratio, zero) {
          let currentShare = shares.contents[currentIndex]->Option.getOr(zero)
          let newShare = calculator.add(currentShare, amount)
          // Use mutable array assignment with ref
          shares.contents[currentIndex] = newShare
          remainder := calculator.subtract(remainder.contents, amount)
        }
        i := i.contents + 1
      }

      shares.contents
    }
  }
}
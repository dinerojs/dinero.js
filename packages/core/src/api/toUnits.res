open Calculator
open Dinero

type toUnitsParams<'amount, 'output> = (
  dinero<'amount>,
  option<Transformer.transformer<'amount, 'output, array<'amount>>>,
)

let toUnits = (calculator: calculator<'amount>) => {
  let getDivisorsFn = GetDivisors.getDivisors(calculator)
  let computeBaseFn = ComputeBase.computeBase(calculator)

  (
    dineroObject: dinero<'amount>,
    transformer: option<Transformer.transformer<'amount, 'output, array<'amount>>>,
  ) => {
    let {amount, currency, scale} = dineroObject.toJSON()
    let {integerDivide, modulo} = calculator

    // Check if currency.base is an array (multi-subdivision) or single value
    let value = if Array.isArray(currency.base) {
      // Multi-subdivision currency (e.g., GBP with [20, 12])
      let bases = currency.base
      let convertedBases = bases->Array.map(base => computeBaseFn(ComputeBase.fromValue(base)))
      let divisors = getDivisorsFn(convertedBases)

      // Calculate units by dividing through each divisor
      let (units, finalRemainder) = divisors->Array.reduce(([], amount), (
        (acc, remainder),
        divisor,
      ) => {
        let quotient = integerDivide(remainder, divisor)
        let newRemainder = modulo(remainder, divisor)
        (acc->Array.concat([quotient]), newRemainder)
      })

      // Add the final remainder as the last unit
      units->Array.concat([finalRemainder])
    } else {
      // Single base currency (e.g., USD with base 10)
      let base = computeBaseFn(ComputeBase.fromValue(currency.base))
      let divisor = calculator.power(base, scale)
      let quotient = integerDivide(amount, divisor)
      let remainder = modulo(amount, divisor)
      [quotient, remainder]
    }

    switch transformer {
    | Some(transform) => transform({value, currency})
    | None => value
    }
  }
}

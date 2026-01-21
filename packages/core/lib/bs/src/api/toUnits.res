open Calculator
open Dinero

type toUnitsParams<'amount, 'output> = (dinero<'amount>, option<Transformer.transformer<'amount, 'output, array<'amount>>>)

let toUnits = (calculator: calculator<'amount>) => {
  let _getDivisorsFn = GetDivisors.getDivisors(calculator)
  
  (dineroObject: dinero<'amount>, transformer: option<Transformer.transformer<'amount, 'output, array<'amount>>>) => {
    let {amount, currency, scale} = dineroObject.toJSON()
    let {power, integerDivide, modulo} = calculator
    
    // Simplified approach - assume currency.base is a single value for now
    let base = currency.base
    let divisor = power(base, scale)
    let quotient = integerDivide(amount, divisor)
    let remainder = modulo(amount, divisor)
    
    let value = [quotient, remainder]
    
    switch transformer {
    | Some(transform) => transform({value, currency})
    | None => value
    }
  }
}
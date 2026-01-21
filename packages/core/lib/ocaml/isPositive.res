open Calculator
open Dinero

type isPositiveParams<'amount> = dinero<'amount>

let isPositive = (calculator: calculator<'amount>) => {
  let greaterThanFn = GreaterThanUtil.greaterThan(calculator)
  
  (dineroObject: dinero<'amount>) => {
    let {amount} = dineroObject.toJSON()
    greaterThanFn(amount, calculator.zero())
  }
}
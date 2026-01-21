open Calculator
open Dinero

type isNegativeParams<'amount> = dinero<'amount>

let isNegative = (calculator: calculator<'amount>) => {
  let lessThanFn = LessThanUtil.lessThan(calculator)
  
  (dineroObject: dinero<'amount>) => {
    let {amount} = dineroObject.toJSON()
    lessThanFn(amount, calculator.zero())
  }
}
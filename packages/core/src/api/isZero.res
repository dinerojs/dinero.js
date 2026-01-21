open Calculator
open Dinero

type isZeroParams<'amount> = dinero<'amount>

let isZero = (calculator: calculator<'amount>) => {
  let equalFn = EqualUtil.equal(calculator)
  
  (dineroObject: dinero<'amount>) => {
    let {amount} = dineroObject.toJSON()
    equalFn(amount, calculator.zero())
  }
}
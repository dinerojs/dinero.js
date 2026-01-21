open Calculator
open Dinero

type transformScaleParams<'amount> = (dinero<'amount>, 'amount, option<DivideOperation.divideOperation<'amount>>)

let transformScale = (calculator: calculator<'amount>) => {
  let greaterThanFn = GreaterThanUtil.greaterThan(calculator)
  let computeBaseFn = ComputeBase.computeBase(calculator)
  
  (dineroObject: dinero<'amount>, newScale: 'amount, ~divide: DivideOperation.divideOperation<'amount>=Down.down, ()) => {
    let {amount, currency, scale} = dineroObject.toJSON()
    
    let isLarger = greaterThanFn(newScale, scale)
    let (a, b) = isLarger ? (newScale, scale) : (scale, newScale)
    let base = computeBaseFn(ComputeBase.fromValue(currency.base))
    
    let factor = calculator.power(base, calculator.subtract(a, b))
    
    let newAmount = if isLarger {
      calculator.multiply(amount, factor)
    } else {
      divide(amount, factor, calculator)
    }
    
    dineroObject.create({
      amount: newAmount,
      currency,
      scale: newScale,
    })
  }
}
open Calculator
open Dinero

type trimScaleParams<'amount> = dinero<'amount>

let trimScale = (calculator: calculator<'amount>) => {
  let countTrailingZerosFn = CountTrailingZeros.countTrailingZeros(calculator)
  let equalFn = EqualUtil.equal(calculator)
  let maximumFn = MaximumUtil.maximum(calculator)
  let transformScaleFn = TransformScale.transformScale(calculator)
  let computeBaseFn = ComputeBase.computeBase(calculator)
  
  (dineroObject: dinero<'amount>) => {
    let {amount, currency, scale} = dineroObject.toJSON()
    let base = computeBaseFn(ComputeBase.fromValue(currency.base))
    
    let trailingZerosLength = countTrailingZerosFn(amount, base)
    let difference = calculator.subtract(scale, trailingZerosLength)
    let newScale = maximumFn([difference, currency.exponent])
    
    if equalFn(newScale, scale) {
      dineroObject
    } else {
      transformScaleFn(dineroObject, newScale, ())
    }
  }
}
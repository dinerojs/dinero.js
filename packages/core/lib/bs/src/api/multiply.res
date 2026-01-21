open Calculator
open Dinero

type multiplyParams<'amount> = (dinero<'amount>, 'amount)

let multiply = (calculator: calculator<'amount>) => {
  let convertScaleFn = TransformScale.transformScale(calculator)
  let zero = calculator.zero()
  
  (multiplicand: dinero<'amount>, multiplier: 'amount) => {
    let {amount, currency, scale} = multiplicand.toJSON()
    let multiplierAmount = multiplier
    let multiplierScale = zero
      
    let newScale = calculator.add(scale, multiplierScale)
    
    convertScaleFn(
      multiplicand.create({
        amount: calculator.multiply(amount, multiplierAmount),
        currency,
        scale: newScale,
      }),
      newScale,
      ()
    )
  }
}
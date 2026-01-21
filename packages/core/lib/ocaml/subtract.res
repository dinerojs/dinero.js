open Calculator
open Dinero

type subtractParams<'amount> = (dinero<'amount>, dinero<'amount>)

let unsafeSubtract = (calculator: calculator<'amount>) => {
  (minuend: dinero<'amount>, subtrahend: dinero<'amount>) => {
    let {amount: minuendAmount, currency, scale} = minuend.toJSON()
    let {amount: subtrahendAmount} = subtrahend.toJSON()
    
    let amount = calculator.subtract(minuendAmount, subtrahendAmount)
    
    minuend.create({
      amount,
      currency,
      scale,
    })
  }
}

let safeSubtract = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let subtractFn = unsafeSubtract(calculator)
  
  (minuend: dinero<'amount>, subtrahend: dinero<'amount>) => {
    let condition = HaveSameCurrency.haveSameCurrency([minuend, subtrahend])
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalized = normalizeFn([minuend, subtrahend])
    let newMinuend = normalized[0]->Option.getOrThrow
    let newSubtrahend = normalized[1]->Option.getOrThrow
    
    subtractFn(newMinuend, newSubtrahend)
  }
}
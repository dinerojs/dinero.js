open Calculator
open Dinero

type maximumParams<'amount> = array<dinero<'amount>>

let unsafeMaximum = (calculator: calculator<'amount>) => {
  let maxFn = MaximumUtil.maximum(calculator)
  
  (dineroObjects: array<dinero<'amount>>) => {
    let firstDinero = dineroObjects[0]->Option.getOrThrow
    let {currency, scale} = firstDinero.toJSON()
    
    let amounts = dineroObjects->Array.map(subject => {
      let {amount: subjectAmount} = subject.toJSON()
      subjectAmount
    })
    
    let amount = maxFn(amounts)
    
    firstDinero.create({
      amount,
      currency,
      scale,
    })
  }
}

let safeMaximum = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let maxFn = unsafeMaximum(calculator)
  
  (dineroObjects: array<dinero<'amount>>) => {
    let condition = HaveSameCurrency.haveSameCurrency(dineroObjects)
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalizedDineroObjects = normalizeFn(dineroObjects)
    
    maxFn(normalizedDineroObjects)
  }
}
open Calculator
open Dinero

type minimumParams<'amount> = array<dinero<'amount>>

let unsafeMinimum = (calculator: calculator<'amount>) => {
  let minFn = MinimumUtil.minimum(calculator)
  
  (dineroObjects: array<dinero<'amount>>) => {
    let firstDinero = dineroObjects[0]->Option.getOrThrow
    let {currency, scale} = firstDinero.toJSON()
    
    let amounts = dineroObjects->Array.map(subject => {
      let {amount: subjectAmount} = subject.toJSON()
      subjectAmount
    })
    
    let amount = minFn(amounts)
    
    firstDinero.create({
      amount,
      currency,
      scale,
    })
  }
}

let safeMinimum = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let minFn = unsafeMinimum(calculator)
  
  (dineroObjects: array<dinero<'amount>>) => {
    let condition = HaveSameCurrency.haveSameCurrency(dineroObjects)
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalizedDineroObjects = normalizeFn(dineroObjects)
    
    minFn(normalizedDineroObjects)
  }
}
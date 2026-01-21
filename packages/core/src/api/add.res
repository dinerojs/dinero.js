open Calculator
open Dinero

type addParams<'amount> = (dinero<'amount>, dinero<'amount>)

let unsafeAdd = (calculator: calculator<'amount>) => {
  (augend: dinero<'amount>, addend: dinero<'amount>) => {
    let {amount: augendAmount, currency, scale} = augend.toJSON()
    let {amount: addendAmount} = addend.toJSON()
    
    let amount = calculator.add(augendAmount, addendAmount)
    
    augend.create({
      amount,
      currency,
      scale,
    })
  }
}

let safeAdd = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let addFn = unsafeAdd(calculator)
  
  (augend: dinero<'amount>, addend: dinero<'amount>) => {
    let condition = HaveSameCurrency.haveSameCurrency([augend, addend])
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalized = normalizeFn([augend, addend])
    let newAugend = normalized[0]->Option.getOrThrow
    let newAddend = normalized[1]->Option.getOrThrow
    
    addFn(newAugend, newAddend)
  }
}
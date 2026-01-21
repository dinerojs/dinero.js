open Calculator
open Dinero

type lessThanOrEqualParams<'amount> = (dinero<'amount>, dinero<'amount>)

let unsafeLessThanOrEqual = (calculator: calculator<'amount>) => {
  let lessThanOrEqualFn = LessThanOrEqualUtil.lessThanOrEqual(calculator)
  
  (dineroObject: dinero<'amount>, comparator: dinero<'amount>) => {
    let dineroObjects = [dineroObject, comparator]
    
    let amounts = dineroObjects->Array.map(d => {
      let {amount} = d.toJSON()
      amount
    })
    let subjectAmount = amounts[0]->Option.getOrThrow
    let comparatorAmount = amounts[1]->Option.getOrThrow
    
    lessThanOrEqualFn(subjectAmount, comparatorAmount)
  }
}

let safeLessThanOrEqual = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let lessThanOrEqualFn = unsafeLessThanOrEqual(calculator)
  
  (dineroObject: dinero<'amount>, comparator: dinero<'amount>) => {
    let condition = HaveSameCurrency.haveSameCurrency([dineroObject, comparator])
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalized = normalizeFn([dineroObject, comparator])
    let subjectAmount = normalized[0]->Option.getOrThrow
    let comparatorAmount = normalized[1]->Option.getOrThrow
    
    lessThanOrEqualFn(subjectAmount, comparatorAmount)
  }
}
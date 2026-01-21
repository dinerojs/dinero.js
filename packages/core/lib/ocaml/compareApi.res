open Calculator
open Dinero

type compareParams<'amount> = (dinero<'amount>, dinero<'amount>)

let unsafeCompare = (calculator: calculator<'amount>) => {
  let compareFn = CompareUtil.compare(calculator)
  
  (dineroObject: dinero<'amount>, comparator: dinero<'amount>) => {
    let dineroObjects = [dineroObject, comparator]
    
    let amounts = dineroObjects->Array.map(d => {
      let {amount} = d.toJSON()
      amount
    })
    let subjectAmount = amounts[0]->Option.getOrThrow
    let comparatorAmount = amounts[1]->Option.getOrThrow
    
    compareFn(subjectAmount, comparatorAmount)
  }
}

let safeCompare = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let compareFn = unsafeCompare(calculator)
  
  (dineroObject: dinero<'amount>, comparator: dinero<'amount>) => {
    let condition = HaveSameCurrency.haveSameCurrency([dineroObject, comparator])
    if !condition {
      JsError.throwWithMessage("Objects must have the same currency.")
    }
    
    let normalized = normalizeFn([dineroObject, comparator])
    let subjectAmount = normalized[0]->Option.getOrThrow
    let comparatorAmount = normalized[1]->Option.getOrThrow
    
    compareFn(subjectAmount, comparatorAmount)
  }
}
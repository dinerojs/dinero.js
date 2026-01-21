open Calculator
open Dinero

type haveSameAmountParams<'amount> = array<dinero<'amount>>

let haveSameAmount = (calculator: calculator<'amount>) => {
  let normalizeFn = NormalizeScale.normalizeScale(calculator)
  let equalFn = EqualUtil.equal(calculator) // Use utils equal function
  
  (dineroObjects: array<dinero<'amount>>) => {
    let normalized = normalizeFn(dineroObjects)
    if Array.length(normalized) <= 1 {
      true
    } else {
      let firstDinero = normalized[0]->Option.getOrThrow
      let otherDineros = normalized->Array.slice(~start=1)
      let {amount: comparatorAmount} = firstDinero.toJSON()
      
      otherDineros->Array.every(d => {
        let {amount: subjectAmount} = d.toJSON()
        equalFn(subjectAmount, comparatorAmount)
      })
    }
  }
}
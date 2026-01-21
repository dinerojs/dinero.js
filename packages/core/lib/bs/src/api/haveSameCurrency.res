open Dinero

let haveSameCurrency = (dineroObjects: array<dinero<'amount>>) => {
  if Array.length(dineroObjects) <= 1 {
    true
  } else {
    let firstDinero = dineroObjects[0]->Option.getOrThrow
    let otherDineros = dineroObjects->Array.slice(~start=1)
    
    let computeBaseFn = ComputeBase.computeBase(firstDinero.calculator)
    let {currency: comparator} = firstDinero.toJSON()
    let equalFn = EqualUtil.equal(firstDinero.calculator)
    let comparatorBase = computeBaseFn(ComputeBase.fromValue(comparator.base))
    
    otherDineros->Array.every(d => {
      let {currency: subject} = d.toJSON()
      let subjectBase = computeBaseFn(ComputeBase.fromValue(subject.base))
      subject.code === comparator.code &&
      equalFn(subjectBase, comparatorBase) &&
      equalFn(subject.exponent, comparator.exponent)
    })
  }
}
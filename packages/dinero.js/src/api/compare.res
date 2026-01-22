// Compare the value of a Dinero object relative to another.
let compare = (dineroObject: DinerojsCore.Dinero.dinero<'a>, comparator: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let compareFn = DinerojsCore.Api.safeCompare(calculator)
  compareFn(dineroObject, comparator)
}

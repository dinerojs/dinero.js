// Check whether the value of a Dinero object is equal to another.
let equal = (dineroObject: DinerojsCore.Dinero.dinero<'a>, comparator: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let equalFn = DinerojsCore.Api.equal(calculator)
  equalFn(dineroObject, comparator)
}

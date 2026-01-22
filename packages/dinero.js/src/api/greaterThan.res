// Check whether the value of a Dinero object is greater than another.
let greaterThan = (dineroObject: DinerojsCore.Dinero.dinero<'a>, comparator: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let greaterThanFn = DinerojsCore.Api.safeGreaterThan(calculator)
  greaterThanFn(dineroObject, comparator)
}

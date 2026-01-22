// Check whether the value of a Dinero object is greater than or equal to another.
let greaterThanOrEqual = (dineroObject: DinerojsCore.Dinero.dinero<'a>, comparator: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let greaterThanOrEqualFn = DinerojsCore.Api.safeGreaterThanOrEqual(calculator)
  greaterThanOrEqualFn(dineroObject, comparator)
}

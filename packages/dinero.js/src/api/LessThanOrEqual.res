// Check whether the value of a Dinero object is lesser than or equal to another.
let lessThanOrEqual = (
  dineroObject: DinerojsCore.Dinero.dinero<'a>,
  comparator: DinerojsCore.Dinero.dinero<'a>,
) => {
  let calculator = dineroObject.calculator
  let lessThanOrEqualFn = DinerojsCore.Api.safeLessThanOrEqual(calculator)
  lessThanOrEqualFn(dineroObject, comparator)
}

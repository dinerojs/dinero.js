// Check whether the value of a Dinero object is lesser than another.
let lessThan = (
  dineroObject: DinerojsCore.Dinero.dinero<'a>,
  comparator: DinerojsCore.Dinero.dinero<'a>,
) => {
  let calculator = dineroObject.calculator
  let lessThanFn = DinerojsCore.Api.safeLessThan(calculator)
  lessThanFn(dineroObject, comparator)
}

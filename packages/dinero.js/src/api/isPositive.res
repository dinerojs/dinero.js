// Check whether the value of a Dinero object is positive.
let isPositive = (dineroObject: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let isPositiveFn = DinerojsCore.Api.isPositive(calculator)
  isPositiveFn(dineroObject)
}

// Check whether the value of a Dinero object is negative.
let isNegative = (dineroObject: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let isNegativeFn = DinerojsCore.Api.isNegative(calculator)
  isNegativeFn(dineroObject)
}

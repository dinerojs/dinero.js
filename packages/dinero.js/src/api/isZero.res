// Check whether the value of a Dinero object is zero.
let isZero = (dineroObject: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let isZeroFn = DinerojsCore.Api.isZero(calculator)
  isZeroFn(dineroObject)
}

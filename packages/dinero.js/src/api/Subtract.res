// Subtract a Dinero object from another.
let subtract = (
  dineroObject: DinerojsCore.Dinero.dinero<'a>,
  subtrahend: DinerojsCore.Dinero.dinero<'a>,
) => {
  let calculator = dineroObject.calculator
  let subtractFn = DinerojsCore.Api.safeSubtract(calculator)
  subtractFn(dineroObject, subtrahend)
}

// Multiply the passed Dinero object.
let multiply = (multiplicand: DinerojsCore.Dinero.dinero<'a>, multiplier: 'b) => {
  let calculator = multiplicand.calculator
  let multiplyFn = DinerojsCore.Api.multiply(calculator)
  multiplyFn(multiplicand, multiplier)
}
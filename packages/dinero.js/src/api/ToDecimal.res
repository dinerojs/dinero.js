// Convert a Dinero object to decimal representation.
let toDecimal = (dineroObject: DinerojsCore.Dinero.dinero<'a>, ~transformer=?, ()) => {
  let calculator = dineroObject.calculator
  let toDecimalFn = DinerojsCore.Api.toDecimal(calculator)
  toDecimalFn(dineroObject, transformer)
}

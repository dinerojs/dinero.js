// Convert a Dinero object to units representation.
let toUnits = (dineroObject: DinerojsCore.Dinero.dinero<'a>, ~transformer=?, ()) => {
  let calculator = dineroObject.calculator
  let toUnitsFn = DinerojsCore.Api.toUnits(calculator)
  toUnitsFn(dineroObject, transformer)
}

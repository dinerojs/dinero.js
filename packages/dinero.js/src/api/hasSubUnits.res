// Check whether a Dinero object has minor currency units.
let hasSubUnits = (dineroObject: DinerojsCore.Dinero.dinero<'a>): bool => {
  let calculator = dineroObject.calculator
  let hasSubUnitsFn = DinerojsCore.Api.hasSubUnits(calculator)
  hasSubUnitsFn(dineroObject)
}

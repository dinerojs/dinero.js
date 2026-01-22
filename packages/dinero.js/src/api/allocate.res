// Distribute the amount of a Dinero object across a list of ratios.
let allocate = (dineroObject: DinerojsCore.Dinero.dinero<'a>, ratios: array<'b>) => {
  let calculator = dineroObject.calculator
  let allocateFn = DinerojsCore.Api.safeAllocate(calculator)
  allocateFn(dineroObject, ratios)
}

// Add up the passed Dinero objects.
let add = (augend: DinerojsCore.Dinero.dinero<'a>, addend: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = augend.calculator
  let addFn = DinerojsCore.Api.safeAdd(calculator)
  addFn(augend, addend)
}

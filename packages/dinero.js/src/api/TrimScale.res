// Trim the scale of a Dinero object.
let trimScale = (dineroObject: DinerojsCore.Dinero.dinero<'a>) => {
  let calculator = dineroObject.calculator
  let trimScaleFn = DinerojsCore.Api.trimScale(calculator)
  trimScaleFn(dineroObject)
}

// Transform the scale of a Dinero object.
let transformScale = (dineroObject: DinerojsCore.Dinero.dinero<'a>, newScale: 'a, ~divide=?, ()) => {
  let calculator = dineroObject.calculator
  let transformScaleFn = DinerojsCore.Api.transformScale(calculator)
  transformScaleFn(dineroObject, newScale, ~divide?, ())
}

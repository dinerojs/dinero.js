// Convert a Dinero object from a currency to another.
let convert = (dineroObject: DinerojsCore.Dinero.dinero<'a>, currency: 'b, rates: 'c) => {
  let calculator = dineroObject.calculator
  let convertFn = DinerojsCore.Api.convert(calculator)
  convertFn(dineroObject, currency, rates)
}

// Check whether Dinero objects have the same amount.
let haveSameAmount = (dineroObjects: array<DinerojsCore.Dinero.dinero<'a>>) => {
  switch dineroObjects[0] {
  | Some(firstDinero) => {
      let calculator = firstDinero.calculator
      let haveSameAmountFn = DinerojsCore.Api.haveSameAmount(calculator)
      haveSameAmountFn(dineroObjects)
    }
  | None => false // or throw error
  }
}

// Get the maximum Dinero object from an array.
let maximum = (dineros: array<DinerojsCore.Dinero.dinero<'a>>) => {
  switch dineros {
  | [] => None
  | dineros => {
      switch dineros[0] {
      | Some(first) => {
          let calculator = first.calculator
          let maximumFn = DinerojsCore.Api.unsafeMaximum(calculator)
          Some(maximumFn(dineros))
        }
      | None => None
      }
    }
  }
}

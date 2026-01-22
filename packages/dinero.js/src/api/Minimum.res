// Get the minimum Dinero object from an array.
let minimum = (dineros: array<DinerojsCore.Dinero.dinero<'a>>) => {
  switch dineros {
  | [] => None
  | dineros => {
      switch dineros[0] {
      | Some(first) => {
          let calculator = first.calculator
          let minimumFn = DinerojsCore.Api.unsafeMinimum(calculator)
          Some(minimumFn(dineros))
        }
      | None => None
      }
    }
  }
}

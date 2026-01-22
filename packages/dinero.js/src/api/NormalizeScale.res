// Normalize Dinero objects to the same scale.
let normalizeScale = (dineros: array<DinerojsCore.Dinero.dinero<'a>>) => {
  switch dineros {
  | [] => []
  | dineros => switch dineros[0] {
    | Some(first) => {
        let calculator = first.calculator
        let normalizeScaleFn = DinerojsCore.Api.normalizeScale(calculator)
        normalizeScaleFn(dineros)
      }
    | None => []
    }
  }
}

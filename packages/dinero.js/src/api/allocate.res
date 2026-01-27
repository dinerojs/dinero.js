// Distribute the amount of a Dinero object across a list of ratios.
let allocate = (dineroObject: DinerojsCore.Dinero.dinero<'a>, ratios: array<'a>) => {
  let calculator = dineroObject.calculator
  let allocateFn = DinerojsCore.Api.safeAllocate(calculator)

  // Convert ratios to ScaledAmount objects
  let scaledRatios = ratios->Array.map(ratio => {
    switch Type.typeof(ratio) {
    | #object =>
      let ratioDict = Obj.magic(ratio)
      switch Dict.get(ratioDict, "amount") {
      | Some(amount) =>
        // Already a ScaledAmount-like object with 'amount' property
        let scale = Dict.get(ratioDict, "scale")
        {
          DinerojsCore.ScaledAmount.amount,
          ?scale,
        }
      | None =>
        // Plain ratio value, wrap it in ScaledAmount structure
        {
          DinerojsCore.ScaledAmount.amount: ratio,
        }
      }
    | _ =>
      // Plain ratio value, wrap it in ScaledAmount structure
      {
        DinerojsCore.ScaledAmount.amount: ratio,
      }
    }
  })

  allocateFn(dineroObject, scaledRatios)
}

// Distribute the amount of a Dinero object across a list of ratios.
let allocate = (dineroObject: DinerojsCore.Dinero.dinero<'a>, ratios: array<'a>) => {
  let calculator = dineroObject.calculator
  let allocateFn = DinerojsCore.Api.safeAllocate(calculator)
  
  // Convert ratios to ScaledAmount objects
  // If the ratio is already an object with 'amount' property, pass it as-is
  // Otherwise, wrap the plain value in a ScaledAmount object
  let scaledRatios = ratios->Array.map(ratio => {
    switch Type.typeof(ratio) {
    | #object =>
      // Check if it has an 'amount' property to determine if it's already a ScaledAmount
      if %raw(`ratio !== null && 'amount' in ratio`) {
        // Already a ScaledAmount-like object, cast it to the right type
        %raw(`ratio`)
      } else {
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

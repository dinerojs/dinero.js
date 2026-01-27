// Helper function to transform a single rate value
let transformRate = (rate: 'a): DinerojsCore.Rates.rate<'a> => {
  switch Type.typeof(rate) {
  | #object =>
    let rateDict = Obj.magic(rate)
    switch Dict.get(rateDict, "amount") {
    | Some(amount) =>
      // ScaledAmount format: { amount: number, scale?: number }  
      let scale = Dict.get(rateDict, "scale")
      DinerojsCore.Rates.ScaledAmount({
        DinerojsCore.ScaledAmount.amount: amount,
        scale: ?scale,
      })
    | None =>
      // Treat as DirectAmount if it's an object without 'amount' property
      DinerojsCore.Rates.DirectAmount(rate)
    }
  | _ =>
    // DirectAmount format: number
    DinerojsCore.Rates.DirectAmount(rate)
  }
}

// Convert a Dinero object from a currency to another.
let convert = (dineroObject: DinerojsCore.Dinero.dinero<'a>, currency: 'b, rates: 'c) => {
  let calculator = dineroObject.calculator
  let convertFn = DinerojsCore.Api.convert(calculator)
  
  // Transform JavaScript rates object to ReScript dict
  let ratesDict = Obj.magic(rates)
  let transformedRates = Dict.fromArray(
    Dict.keysToArray(ratesDict)
    ->Array.map(code => {
      let rate = Dict.get(ratesDict, code)->Option.getUnsafe
      (code, transformRate(rate))
    })
  )
  
  convertFn(dineroObject, currency, transformedRates)
}

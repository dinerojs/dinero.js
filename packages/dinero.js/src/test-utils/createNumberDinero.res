let numberFormatter: DinerojsCore.Formatter.formatter<float> = {
  toNumber: value => {
    switch value {
    | Some(v) => v
    | None => 0.0
    }
  },
  toString: value => {
    switch value {
    | Some(v) => Float.toString(v)
    | None => ""
    }
  },
}

@genType
let createNumberDinero = (
  options: DinerojsCore.Types.dineroOptions<float>,
): DinerojsCore.Types.dinero<float> => {
  let dineroFactory = DinerojsCore.Api.createDinero({
    calculator: DinerojsCalculatorNumber.Calculator.calculator,
    formatter: numberFormatter,
    onCreate: _ => (),
  })
  dineroFactory(options)
}

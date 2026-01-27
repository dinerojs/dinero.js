let bigintFormatter: DinerojsCore.Formatter.formatter<bigint> = {
  toNumber: value => {
    switch value {
    | Some(v) => BigInt.toFloat(v)
    | None => 0.0
    }
  },
  toString: value => {
    switch value {
    | Some(v) => BigInt.toString(v)
    | None => ""
    }
  },
}

@genType
let createBigintDinero = (
  options: DinerojsCore.Types.dineroOptions<bigint>,
): DinerojsCore.Types.dinero<bigint> => {
  let dineroFactory = DinerojsCore.Api.createDinero({
    calculator: DinerojsCalculatorBigint.Calculator.calculator,
    formatter: bigintFormatter,
    onCreate: _ => (),
  })
  dineroFactory(options)
}

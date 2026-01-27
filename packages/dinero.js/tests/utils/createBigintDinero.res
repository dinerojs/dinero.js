@genType
let createBigintDinero = (options: DinerojsCore.Types.dineroOptions<bigint>): DinerojsCore.Types.dinero<bigint> => {
  let dineroFactory = DinerojsCore.Api.createDinero({
    calculator: DinerojsCalculatorBigint.Calculator.calculator,
    onCreate: _ => ()
  })
  dineroFactory(options)
}
@genType  
let createNumberDinero = (options: DinerojsCore.Types.dineroOptions<float>): DinerojsCore.Types.dinero<float> => {
  let dineroFactory = DinerojsCore.createDinero({
    calculator: DinerojsCalculatorNumber.Calculator.calculator,
    onCreate: _ => ()
  })
  dineroFactory(options)
}
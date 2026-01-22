// Create a Dinero factory using ReScript core
let dinero = DinerojsCore.CreateDinero.createDinero({
  calculator: DinerojsCalculatorNumber.Calculator.calculator,
  onCreate: ?Some(
    _params => {
      // Add validation if needed
      ()
    },
  ),
})

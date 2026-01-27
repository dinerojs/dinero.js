// Create a Dinero factory using ReScript core
let dinero = DinerojsCore.Api.createDinero({
  calculator: DinerojsCalculatorNumber.Calculator.calculator,
  onCreate: ?Some(
    _params => {
      // Add validation if needed
      ()
    },
  ),
})

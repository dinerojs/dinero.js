open DivideOperation

let halfTowardsZero: divideOperation<'amount> = (amount, factor, calculator) => {
  let signFn = Sign.sign(calculator)
  let isHalfFn = IsHalf.isHalf(calculator)
  let absoluteFn = Absolute.absolute(calculator)
  
  if !isHalfFn(amount, factor) {
    HalfUp.halfUp(amount, factor, calculator)
  } else {
    calculator.multiply(
      signFn(amount),
      Down.down(absoluteFn(amount), factor, calculator)
    )
  }
}
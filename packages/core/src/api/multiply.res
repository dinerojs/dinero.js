open Calculator
open Dinero

type factorObj<'amount> = {
  amount: 'amount,
  scale: 'amount,
}

type multiplyParams<'amount> = (dinero<'amount>, 'amount)

let multiply = (calculator: calculator<'amount>) => {
  let convertScaleFn = TransformScale.transformScale(calculator)
  let zero = calculator.zero()

  (multiplicand: dinero<'amount>, multiplier: 'amount) => {
    let {amount, currency, scale} = multiplicand.toJSON()

    // Check if multiplier is an object with amount and scale properties
    let (multiplierAmount, multiplierScale) = try {
      let factorObj = Obj.magic(multiplier) // Cast to object to check properties
      let hasAmount = switch factorObj["amount"]->Type.typeof {
      | #undefined => false
      | _ => true
      }
      let hasScale = switch factorObj["scale"]->Type.typeof {
      | #undefined => false
      | _ => true
      }

      if hasAmount && hasScale {
        (factorObj["amount"], factorObj["scale"])
      } else {
        (multiplier, zero)
      }
    } catch {
    | _ => (multiplier, zero)
    }

    let newScale = calculator.add(scale, multiplierScale)

    convertScaleFn(
      multiplicand.create({
        amount: calculator.multiply(amount, multiplierAmount),
        currency,
        scale: newScale,
      }),
      newScale,
      (),
    )
  }
}

open Calculator
open Formatter
open Dinero
open DineroOptions

type createDineroOptions<'amount> = {
  calculator: calculator<'amount>,
  formatter?: formatter<'amount>,
  onCreate?: dineroOptions<'amount> => unit,
}

/**
 * Creates a Dinero factory function.
 *
 * @param options - The creation options including calculator and formatter.
 *
 * @returns A function that creates Dinero objects.
 */
let rec createDinero = (options: createDineroOptions<'amount>) => {
  let {calculator} = options
  let defaultFormatter = {
    toNumber: (_: option<'amount>) => 0.0,
    toString: (_: option<'amount>) => "",
  }
  let actualFormatter = options.formatter->Option.getOr(defaultFormatter)
  
  (dineroOptions: dineroOptions<'amount>): dinero<'amount> => {
    let {amount, currency} = dineroOptions
    let {code, base, exponent} = currency
    let actualScale = dineroOptions.scale->Option.getOr(exponent)
    
    // Call onCreate if provided
    switch options.onCreate {
    | Some(callback) => callback({amount, currency: {code, base, exponent}, scale: actualScale})
    | None => ()
    }
    
    // Create the dinero object with recursive create function
    let rec dineroObj = {
      calculator,
      formatter: actualFormatter,
      create: createFn,
      toJSON: () => {
        amount,
        currency: {code, base, exponent},
        scale: actualScale,
      },
    }
    and createFn = (opts: dineroOptions<'amount>) => {
      // Recursive call to create new dinero objects  
      let factory = createDinero({calculator, onCreate: ?options.onCreate, formatter: ?options.formatter})
      factory(opts)
    }
    
    dineroObj
  }
}
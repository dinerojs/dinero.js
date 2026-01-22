// Import all API functions
// Import only the required functions from Api
let add = Api.add
let compare = Api.compare
let decrement = Api.decrement
let increment = Api.increment
let integerDivide = Api.integerDivide
let modulo = Api.modulo
let multiply = Api.multiply
let power = Api.power
let subtract = Api.subtract
let zero = Api.zero

// Create calculator object with all operations
let calculator = {
  "add": add,
  "compare": compare,
  "decrement": decrement,
  "increment": increment,
  "integerDivide": integerDivide,
  "modulo": modulo,
  "multiply": multiply,
  "power": power,
  "subtract": subtract,
  "zero": zero,
}

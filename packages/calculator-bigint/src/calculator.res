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
let calculator: DinerojsCore.Calculator.calculator<bigint> = {
  add,
  compare,
  decrement,
  increment,
  integerDivide,
  modulo,
  multiply,
  power,
  subtract,
  zero,
}

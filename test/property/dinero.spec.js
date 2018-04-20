import Dinero from '../../src/dinero'
import jsc from 'jsverify'

describe('Dinero', () => {
  describe('precision', () => {
    test('should return the correct amount for precision values in range', () => {
      jsc.assert(
        jsc.forall(
          jsc.integer(1, 15),
          a =>
            Dinero({ amount: Math.pow(10, a + 1), precision: a }).toUnit() ===
            10
        )
      )
    })
  })
  describe('#add()', () => {
    test('should be commutative', () => {
      jsc.assert(
        jsc.forall(
          jsc.record({ amount: jsc.integer }),
          jsc.record({ amount: jsc.integer }),
          (a, b) =>
            Dinero(a)
              .add(Dinero(b))
              .getAmount() ===
            Dinero(b)
              .add(Dinero(a))
              .getAmount()
        )
      )
    })
    test('should be associative', () => {
      jsc.assert(
        jsc.forall(
          jsc.record({ amount: jsc.integer }),
          jsc.record({ amount: jsc.integer }),
          jsc.record({ amount: jsc.integer }),
          (a, b, c) =>
            Dinero(a)
              .add(Dinero(b))
              .add(Dinero(c))
              .getAmount() ===
            Dinero(b)
              .add(Dinero(a).add(Dinero(c)))
              .getAmount()
        )
      )
    })
    test('should be distributive with integers', () => {
      jsc.assert(
        jsc.forall(
          jsc.integer,
          jsc.record({ amount: jsc.integer }),
          jsc.record({ amount: jsc.integer }),
          (a, b, c) =>
            Dinero(b)
              .add(Dinero(c))
              .multiply(a)
              .getAmount() ===
            Dinero(b)
              .multiply(a)
              .add(Dinero(c).multiply(a))
              .getAmount()
        )
      )
    })
  })
  describe('#multiply()', () => {
    test('should be commutative', () => {
      jsc.assert(
        jsc.forall(
          jsc.integer,
          jsc.integer,
          (a, b) =>
            Dinero({ amount: a })
              .multiply(b)
              .getAmount() ===
            Dinero({ amount: b })
              .multiply(a)
              .getAmount()
        )
      )
    })
    test('should be associative', () => {
      jsc.assert(
        jsc.forall(
          jsc.integer,
          jsc.integer,
          jsc.integer,
          (a, b, c) =>
            Dinero({ amount: a })
              .multiply(b)
              .multiply(c)
              .getAmount() ===
            Dinero({ amount: b })
              .multiply(
                Dinero({ amount: a })
                  .multiply(c)
                  .getAmount()
              )
              .getAmount()
        )
      )
    })
    test('should be distributive with integers', () => {
      jsc.assert(
        jsc.forall(
          jsc.integer,
          jsc.record({ amount: jsc.integer }),
          jsc.record({ amount: jsc.integer }),
          (a, b, c) =>
            Dinero(b)
              .add(Dinero(c))
              .multiply(a)
              .getAmount() ===
            Dinero(b)
              .multiply(a)
              .add(Dinero(c).multiply(a))
              .getAmount()
        )
      )
    })
    test('should round when multiplier is a non-integer', () => {
      jsc.assert(
        jsc.forall(
          jsc.nat,
          jsc.number(-1e10, 1e10),
          (a, b) =>
            Dinero({ amount: a })
              .multiply(b)
              .getAmount() -
              a * b <
            0.5
        )
      )
    })
  })
  describe('#divide()', () => {
    test('should round when divisor is a positive non-integer', () => {
      jsc.assert(
        jsc.forall(
          jsc.nat,
          jsc.number(1, 1e10),
          (a, b) =>
            Dinero({ amount: a })
              .divide(b)
              .getAmount() -
              a / b <
            0.5
        )
      )
    })
    test('should round when divisor is a negative non-integer', () => {
      jsc.assert(
        jsc.forall(
          jsc.nat,
          jsc.number(-1e10, -1e-10),
          (a, b) =>
            Dinero({ amount: a })
              .divide(b)
              .getAmount() -
              a / b <
            0.5
        )
      )
    })
  })
})

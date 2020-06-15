import { DineroOptions, RoundingMode } from '@dinero.js/core';
import { Calculator, ChainableDinero } from './types';

type DineroFactoryOptions<TType> = {
  readonly calculator: Calculator<TType>;
};

const createDinero = <TType>({ calculator }: DineroFactoryOptions<TType>) => {
  function normalizeScale(...objects: ReadonlyArray<ChainableDinero<TType>>) {
    const scales = objects.map((obj) => obj.getScale());
    const highestScale = calculator.maximum(scales);

    return objects.map((obj) => {
      if (obj.getScale() !== highestScale) {
        return obj.convertScale(highestScale);
      }

      return obj;
    });
  }

  function add(augend: ChainableDinero<TType>, addend: ChainableDinero<TType>) {
    return dinero({
      amount: calculator.add(augend.getAmount(), addend.getAmount()),
      currency: augend.getCurrency(),
      scale: augend.getScale(),
    });
  }

  function subtract(
    minuend: ChainableDinero<TType>,
    subtrahend: ChainableDinero<TType>
  ) {
    return dinero({
      amount: calculator.subtract(minuend.getAmount(), subtrahend.getAmount()),
      currency: minuend.getCurrency(),
      scale: minuend.getScale(),
    });
  }

  function divide(
    dividend: ChainableDinero<TType>,
    divisor: TType,
    roundingMode: RoundingMode<TType> = calculator.round
  ) {
    return dinero({
      amount: roundingMode(calculator.divide(dividend.getAmount(), divisor)),
      currency: dividend.getCurrency(),
      scale: dividend.getScale(),
    });
  }

  function percentage(dineroObject: ChainableDinero<TType>, share: TType) {
    return dinero({
      amount: calculator.percentage(dineroObject.getAmount(), share),
      currency: dineroObject.getCurrency(),
      scale: dineroObject.getScale(),
    });
  }

  function allocate(
    dineroObject: ChainableDinero<TType>,
    ratios: readonly TType[]
  ) {
    const shares = calculator.distribute(dineroObject.getAmount(), ratios);

    return shares.map((share) =>
      dinero({
        amount: share,
        currency: dineroObject.getCurrency(),
        scale: dineroObject.getScale(),
      })
    );
  }

  function multiply(
    multiplier: ChainableDinero<TType>,
    multiplicand: TType,
    roundingMode: RoundingMode<TType> = calculator.round
  ) {
    return dinero({
      amount: roundingMode(
        calculator.multiply(multiplier.getAmount(), multiplicand)
      ),
      currency: multiplier.getCurrency(),
      scale: multiplier.getScale(),
    });
  }

  function convertScale(
    dineroObject: ChainableDinero<TType>,
    newScale: TType,
    roundingMode = calculator.round
  ) {
    return dinero({
      amount: roundingMode(
        calculator.multiply(
          dineroObject.getAmount(),
          calculator.power(
            dineroObject.getCurrency().base,
            calculator.subtract(newScale, dineroObject.getScale())
          )
        )
      ),
      currency: dineroObject.getCurrency(),
      scale: newScale,
    });
  }

  function equalsTo(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    return (
      dineroObject.hasSameAmount(comparator) &&
      dineroObject.hasSameCurrency(comparator)
    );
  }

  function lessThan(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    const [d1, d2] = normalizeScale(dineroObject, comparator);

    return calculator.lessThan(d1.getAmount(), d2.getAmount());
  }

  function lessThanOrEqual(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    const [d1, d2] = normalizeScale(dineroObject, comparator);

    return calculator.lessThanOrEqual(d1.getAmount(), d2.getAmount());
  }

  function greaterThan(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    const [d1, d2] = normalizeScale(dineroObject, comparator);

    return calculator.greaterThan(d1.getAmount(), d2.getAmount());
  }

  function greaterThanOrEqual(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    const [d1, d2] = normalizeScale(dineroObject, comparator);

    return calculator.greaterThanOrEqual(d1.getAmount(), d2.getAmount());
  }

  function isZero(dineroObject: ChainableDinero<TType>) {
    return calculator.areEqual(dineroObject.getAmount(), calculator.zero());
  }

  function isPositive(dineroObject: ChainableDinero<TType>) {
    return calculator.greaterThanOrEqual(
      dineroObject.getAmount(),
      calculator.zero()
    );
  }

  function isNegative(dineroObject: ChainableDinero<TType>) {
    return calculator.lessThan(dineroObject.getAmount(), calculator.zero());
  }

  function hasSubUnits(dineroObject: ChainableDinero<TType>) {
    return !calculator.areEqual(
      calculator.modulo(
        dineroObject.getAmount(),
        calculator.power(
          dineroObject.getCurrency().base,
          dineroObject.getScale()
        )
      ),
      calculator.zero()
    );
  }

  function hasSameCurrency(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    return dineroObject.getCurrency() === comparator.getCurrency();
  }

  function hasSameAmount(
    dineroObject: ChainableDinero<TType>,
    comparator: ChainableDinero<TType>
  ) {
    const [d1, d2] = normalizeScale(dineroObject, comparator);

    return d1.getAmount() === d2.getAmount();
  }

  function toUnit(dineroObject: ChainableDinero<TType>) {
    return calculator.divide(
      dineroObject.getAmount(),
      calculator.power(dineroObject.getCurrency().base, dineroObject.getScale())
    );
  }

  function toRoundedUnit(
    dineroObject: ChainableDinero<TType>,
    digits: TType,
    roundingMode: RoundingMode<TType> = calculator.round
  ) {
    const factor = calculator.power(dineroObject.getCurrency().base, digits);

    return calculator.divide(
      roundingMode(calculator.multiply(toUnit(dineroObject), factor)),
      factor
    );
  }

  function toSnapshot(dineroObject: ChainableDinero<TType>) {
    return {
      amount: dineroObject.getAmount(),
      currency: dineroObject.getCurrency(),
      scale: dineroObject.getScale(),
    };
  }

  function dinero({
    amount,
    currency,
    scale = currency.exponent,
  }: DineroOptions<TType>): ChainableDinero<TType> {
    const d: ChainableDinero<TType> = {
      getAmount() {
        return amount;
      },
      getCurrency() {
        return currency;
      },
      getScale() {
        return scale;
      },
      add(addend) {
        return add(d, addend);
      },
      subtract(subtrahend) {
        return subtract(d, subtrahend);
      },
      multiply(multiplier, roundingMode) {
        return multiply(d, multiplier, roundingMode);
      },
      divide(divisor, roundingMode) {
        return divide(d, divisor, roundingMode);
      },
      percentage(share) {
        return percentage(d, share);
      },
      allocate(ratios) {
        return allocate(d, ratios);
      },
      convertScale(newScale, roundingMode) {
        return convertScale(d, newScale, roundingMode);
      },
      async convert(newCurrency, { rates, roundingMode }) {
        const r = await rates;
        const rate = r[newCurrency.code.alpha];

        return dinero({
          amount: calculator.round(
            calculator.multiply(amount, rate),
            roundingMode
          ),
          currency: newCurrency,
          scale,
        });
      },
      equalsTo(comparator) {
        return equalsTo(d, comparator);
      },
      lessThan(comparator) {
        return lessThan(d, comparator);
      },
      lessThanOrEqual(comparator) {
        return lessThanOrEqual(d, comparator);
      },
      greaterThan(comparator) {
        return greaterThan(d, comparator);
      },
      greaterThanOrEqual(comparator) {
        return greaterThanOrEqual(d, comparator);
      },
      isZero() {
        return isZero(d);
      },
      isPositive() {
        return isPositive(d);
      },
      isNegative() {
        return isNegative(d);
      },
      hasSubUnits() {
        return hasSubUnits(d);
      },
      hasSameCurrency(comparator) {
        return hasSameCurrency(d, comparator);
      },
      hasSameAmount(comparator) {
        return hasSameAmount(d, comparator);
      },
      toFormat() {},
      toUnit() {
        return toUnit(d);
      },
      toRoundedUnit(digits, roundingMode) {
        return toRoundedUnit(d, digits, roundingMode);
      },
      toSnapshot() {
        return toSnapshot(d);
      },
      toJSON() {
        return toSnapshot(d);
      },
    };

    return d;
  }

  return dinero;
};

export default createDinero;

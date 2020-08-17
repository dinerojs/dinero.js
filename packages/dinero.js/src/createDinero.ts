import {
  DineroOptions,
  Calculator,
  add,
  allocate,
  convert,
  convertScale,
  divide,
  equal,
  greaterThan,
  greaterThanOrEqual,
  haveSameAmount,
  haveSameCurrency,
  hasSubUnits,
  isNegative,
  isPositive,
  isZero,
  lessThan,
  lessThanOrEqual,
  multiply,
  percentage,
  subtract,
  toFormat,
  toUnit,
  toRoundedUnit,
  toSnapshot,
} from '@dinero.js/core';
import { ChainableDinero } from './types';

type DineroFactoryOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
};

const createDinero = <TAmount>({
  calculator,
}: DineroFactoryOptions<TAmount>) => {
  function dinero({
    amount,
    currency,
    scale = currency.exponent,
  }: DineroOptions<TAmount>): ChainableDinero<TAmount> {
    const d: ChainableDinero<TAmount> = {
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
        return add(dinero, calculator)(d, addend);
      },
      subtract(subtrahend) {
        return subtract(dinero, calculator)(d, subtrahend);
      },
      multiply(multiplier, roundingMode = calculator.round) {
        return multiply(dinero, calculator)(d, multiplier, roundingMode);
      },
      divide(divisor, roundingMode = calculator.round) {
        return divide(dinero, calculator)(d, divisor, roundingMode);
      },
      percentage(share) {
        return percentage(dinero, calculator)(d, share);
      },
      allocate(ratios) {
        return allocate(dinero, calculator)(d, ratios);
      },
      convertScale(newScale, roundingMode = calculator.round) {
        return convertScale(dinero, calculator)(d, newScale, roundingMode);
      },
      convert(newCurrency, { rates, roundingMode, preserveScale }) {
        return convert(dinero, calculator)(d, newCurrency, {
          rates,
          roundingMode,
          preserveScale,
        });
      },
      equalsTo(comparator) {
        return equal(dinero, calculator)(d, comparator);
      },
      lessThan(comparator) {
        return lessThan(dinero, calculator)(d, comparator);
      },
      lessThanOrEqual(comparator) {
        return lessThanOrEqual(dinero, calculator)(d, comparator);
      },
      greaterThan(comparator) {
        return greaterThan(dinero, calculator)(d, comparator);
      },
      greaterThanOrEqual(comparator) {
        return greaterThanOrEqual(dinero, calculator)(d, comparator);
      },
      isZero() {
        return isZero(calculator)(d);
      },
      isPositive() {
        return isPositive(calculator)(d);
      },
      isNegative() {
        return isNegative(calculator)(d);
      },
      hasSubUnits() {
        return hasSubUnits(calculator)(d);
      },
      hasSameCurrency(comparator) {
        return haveSameCurrency([d, comparator]);
      },
      hasSameAmount(comparator) {
        return haveSameAmount(dinero, calculator)([d, comparator]);
      },
      toFormat(transformer, { digits, roundingMode }) {
        return toFormat(calculator)(d, transformer, { digits, roundingMode });
      },
      toUnit() {
        return toUnit(calculator)(d);
      },
      toRoundedUnit(digits, roundingMode = calculator.round) {
        return toRoundedUnit(calculator)(d, digits, roundingMode);
      },
      toSnapshot() {
        return toSnapshot(d);
      },
      toJSON() {
        return {
          amount,
          currency,
          scale,
        };
      },
    };

    return d;
  }

  return dinero;
};

export default createDinero;

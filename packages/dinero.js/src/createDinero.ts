import { DineroOptions } from '@dinero.js/core';
import { Calculator, ChainableDinero } from './types';
import {
  add,
  allocate,
  convert,
  convertScale,
  divide,
  equalsTo,
  greaterThan,
  greaterThanOrEqual,
  hasSameAmount,
  hasSameCurrency,
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
} from './api';

type DineroFactoryOptions<TAmountType> = {
  readonly calculator: Calculator<TAmountType>;
};

const createDinero = <TAmountType>({ calculator }: DineroFactoryOptions<TAmountType>) => {
  function dinero({
    amount,
    currency,
    scale = currency.exponent,
  }: DineroOptions<TAmountType>): ChainableDinero<TAmountType> {
    const d: ChainableDinero<TAmountType> = {
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
      convert(newCurrency, { rates, roundingMode = calculator.round }) {
        return convert(dinero, calculator)(d, newCurrency, {
          rates,
          roundingMode,
        });
      },
      equalsTo(comparator) {
        return equalsTo(d, comparator);
      },
      lessThan(comparator) {
        return lessThan(calculator)(d, comparator);
      },
      lessThanOrEqual(comparator) {
        return lessThanOrEqual(calculator)(d, comparator);
      },
      greaterThan(comparator) {
        return greaterThan(calculator)(d, comparator);
      },
      greaterThanOrEqual(comparator) {
        return greaterThanOrEqual(calculator)(d, comparator);
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
        return hasSameCurrency(d, comparator);
      },
      hasSameAmount(comparator) {
        return hasSameAmount(calculator)(d, comparator);
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
        return toSnapshot(d);
      },
    };

    return d;
  }

  return dinero;
};

export default createDinero;

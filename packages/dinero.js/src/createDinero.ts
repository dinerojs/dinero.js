import { Calculator } from '@dinero.js/_/calculator';
import { OODinero, DineroSnapshot } from '../types';

type DineroFactoryOptions<TType> = {
  readonly calculator: Calculator<TType>;
};

const createDinero = <TType>({ calculator }: DineroFactoryOptions<TType>) => {
  function normalizePrecision(...objects: ReadonlyArray<OODinero<TType>>) {
    const scales = objects.map((obj) => obj.getScale());
    const highestPrecision = calculator.maximum(...scales);

    return objects.map((obj) => {
      if (obj.getScale() !== highestPrecision) {
        return obj.convertPrecision(highestPrecision);
      }

      return obj;
    });
  }

  function Dinero({
    amount,
    currency,
    scale,
  }: DineroSnapshot<TType>): OODinero<TType> {
    const d: OODinero<TType> = {
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
        return Dinero({
          amount: calculator.add(addend.getAmount(), amount),
          currency,
          scale,
        });
      },
      subtract(subtrahend) {
        return Dinero({
          amount: calculator.subtract(subtrahend.getAmount(), amount),
          currency,
          scale,
        });
      },
      multiply(multiplier, roundingMode) {
        return Dinero({
          amount: calculator.multiply(multiplier.getAmount(), amount),
          currency,
          scale,
        });
      },
      divide(divisor, roundingMode) {
        return Dinero({
          amount: calculator.divide(divisor.getAmount(), amount),
          currency,
          scale,
        });
      },
      percentage(percentage) {
        return Dinero({
          amount: calculator.percentage(amount, percentage),
          currency,
          scale,
        });
      },
      allocate(ratios) {
        const shares = calculator.distribute(amount, ratios);

        return shares.map((share) =>
          Dinero({
            amount: share,
            currency,
            scale,
          })
        );
      },
      convertPrecision(newScale, roundingMode) {
        return Dinero({
          amount: calculator.round(
            calculator.multiply(
              amount,
              calculator.power(
                currency.base,
                calculator.subtract(newScale, scale)
              )
            ),
            roundingMode
          ),
          currency,
          scale: newScale,
        });
      },
      async convert(newCurrency, { rates, roundingMode }) {
        const r = await rates;
        const rate = r[newCurrency.code.alpha];

        return Dinero({
          amount: calculator.round(
            calculator.multiply(amount, rate),
            roundingMode
          ),
          currency: newCurrency,
          scale,
        });
      },
      equalsTo(comparator) {
        return d.hasSameAmount(comparator) && d.hasSameCurrency(comparator);
      },
      lessThan(comparator) {
        const [d1, d2] = normalizePrecision(d, comparator);

        return calculator.lessThan(d1.getAmount(), d2.getAmount());
      },
      lessThanOrEqual(comparator) {
        const [d1, d2] = normalizePrecision(d, comparator);

        return calculator.lessThanOrEqual(d1.getAmount(), d2.getAmount());
      },
      greaterThan(comparator) {
        const [d1, d2] = normalizePrecision(d, comparator);

        return calculator.greaterThan(d1.getAmount(), d2.getAmount());
      },
      greaterThanOrEqual(comparator) {
        const [d1, d2] = normalizePrecision(d, comparator);

        return calculator.greaterThanOrEqual(d1.getAmount(), d2.getAmount());
      },
      isZero() {
        return calculator.equalsTo(amount, calculator.zero());
      },
      isPositive() {
        return calculator.greaterThanOrEqual(amount, calculator.zero());
      },
      isNegative() {
        return calculator.lessThan(amount, calculator.zero());
      },
      hasSubUnits() {
        return !calculator.equalsTo(
          calculator.modulo(amount, calculator.power(currency.base, scale)),
          calculator.zero()
        );
      },
      hasSameCurrency(comparator) {
        return currency === comparator.getCurrency();
      },
      hasSameAmount(comparator) {
        const [d1, d2] = normalizePrecision(d, comparator);

        return d1.getAmount() === d2.getAmount();
      },
      toFormat() {},
      toUnit() {
        return calculator.divide(
          amount,
          calculator.power(currency.base, scale)
        );
      },
      toRoundedUnit() {},
      toObject() {
        return {
          amount,
          currency,
          scale,
        };
      },
      toJSON() {
        return d.toObject();
      },
    };

    return d;
  }

  return Dinero;
};

export default createDinero;

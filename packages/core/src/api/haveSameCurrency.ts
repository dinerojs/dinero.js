import type { Dinero } from '../types';
import { computeBase, equal } from '../utils';

export function haveSameCurrency<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const [firstDinero, ...otherDineros] = dineroObjects;
  const computeBaseFn = computeBase(firstDinero.calculator);

  const { currency: comparator } = firstDinero.toJSON();
  const equalFn = equal(firstDinero.calculator);
  const comparatorBase = computeBaseFn(comparator.base);

  return otherDineros.every((d) => {
    const { currency: subject } = d.toJSON();
    const subjectBase = computeBaseFn(subject.base);

    return (
      subject.code === comparator.code &&
      equalFn(subjectBase, comparatorBase) &&
      equalFn(subject.exponent, comparator.exponent)
    );
  });
}

import { ChainableDinero, Calculator } from '../types';

function normalizeScale<TAmountType>(calculator: Calculator<TAmountType>) {
  return (...objects: ReadonlyArray<ChainableDinero<TAmountType>>) => {
    const scales = objects.map((obj) => obj.getScale());
    const highestScale = calculator.maximum(scales);

    return objects.map((obj) => {
      if (obj.getScale() !== highestScale) {
        return obj.convertScale(highestScale);
      }

      return obj;
    });
  };
}

export default normalizeScale;

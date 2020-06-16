import { ChainableDinero, Calculator } from '../types';

function normalizeScale<TType>(calculator: Calculator<TType>) {
  return (...objects: ReadonlyArray<ChainableDinero<TType>>) => {
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

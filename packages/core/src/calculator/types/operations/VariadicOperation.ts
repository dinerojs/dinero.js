type VariadicOperation<TType> = (...values: readonly TType[]) => TType;

export default VariadicOperation;

type Rates<TType> = Readonly<Promise<{ readonly [key: string]: TType }>>;

export default Rates;

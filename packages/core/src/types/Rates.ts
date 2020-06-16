type Rates<TAmountType> = Readonly<Promise<{ readonly [key: string]: TAmountType }>>;

export default Rates;

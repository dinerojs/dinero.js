type binaryOperation<'tInput, 'tOutput> = ('tInput, 'tInput) => 'tOutput

// Default case where TOutput = TInput  
type binaryOperationSame<'tInput> = ('tInput, 'tInput) => 'tInput
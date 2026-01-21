type unaryOperation<'tInput, 'tOutput> = 'tInput => 'tOutput

// Default case where TOutput = TInput
type unaryOperationSame<'tInput> = 'tInput => 'tInput
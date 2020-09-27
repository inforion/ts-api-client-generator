export class ApiResponse<TReturn, TContext = undefined, TResponse = undefined> {
    constructor(
        public raw: TResponse,
        private transform: (response: TResponse, context?: TContext) => Promise<TReturn>,
        private context?: TContext
    ) {}

    public value(): Promise<TReturn> {
        return this.transform(this.raw);
    }
}
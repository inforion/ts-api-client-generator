export interface ClientAdapterConfig<TResponse, TContext> {
    transformResponse?: <TReturn>(
        response: TResponse,
        context?: TContext
    ) => Promise<TReturn>;
}
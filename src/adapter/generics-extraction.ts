import { AnyClientAdapter, ClientAdapter } from './client-adapter';

export type ResponseFromAdapter<TAdapter extends AnyClientAdapter> =
    TAdapter extends ClientAdapter<infer TResponse, infer TContext>
        ? TResponse
        : never;
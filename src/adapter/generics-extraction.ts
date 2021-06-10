import { AnyClientAdapter, ClientAdapter } from './client-adapter';

export type ResponseFromAdapter<TAdapter extends AnyClientAdapter> =
    TAdapter extends ClientAdapter<infer TResponse, any>
        ? TResponse
        : never;
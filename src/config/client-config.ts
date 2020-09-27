import { ClientAdapter, IHaveAdapter } from '../adapter';
import {
    AnyEndpointsGroupConfig,
    ConnectionConfig,
    IHaveEndpoints
} from '../config-parts';

export interface ClientConfig<
    TEndpoints extends AnyEndpointsGroupConfig,
    TAdapter extends ClientAdapter<TResponse, any>,
    TResponse
> extends ConnectionConfig, IHaveEndpoints<TEndpoints>, IHaveAdapter<TAdapter>
{ }

export type AnyClientConfig<TResponse> =
    ClientConfig<AnyEndpointsGroupConfig, ClientAdapter<TResponse, any>, TResponse>;
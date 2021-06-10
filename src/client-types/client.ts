import { AnyEndpointsGroupConfig } from '../config-parts';
import { EndpointsGroup } from './endpoints-group';

export type Client<TEndpoints extends AnyEndpointsGroupConfig, TResponse> = {
    [K in keyof TEndpoints]: EndpointsGroup<TEndpoints[K], TResponse>
};
import { AnyEndpointConfig } from '../config-parts/endpoints';
import { EndpointFunction } from './endpoint-function';

export type EndpointsGroup<TEndpoint extends AnyEndpointConfig, TResponse> = {
    [K in keyof TEndpoint['children']]: EndpointsGroup<TEndpoint['children'][K], TResponse>
} & {
    /* @ts-ignore */
    [K in keyof TEndpoint['methods']]: EndpointFunction<TEndpoint['methods'][K], TResponse>
};
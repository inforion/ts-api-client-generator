import { AnyMethodsConfig } from './methods-config';

export interface EndpointConfig<
    TEndpoints extends AnyEndpointsGroupConfig,
    TMethods extends AnyMethodsConfig
> {
    name?: string,

    children?: TEndpoints,

    methods?: TMethods
}

export type AnyEndpointConfig =
    EndpointConfig<AnyEndpointsGroupConfig, AnyMethodsConfig>;

export type AnyEndpointsGroupConfig =
    Record<string, AnyEndpointConfig>;
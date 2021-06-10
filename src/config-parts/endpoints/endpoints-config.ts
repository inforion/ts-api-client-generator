import { AnyMethodsConfig } from './methods-config';

export interface EndpointConfig<
    // eslint-disable-next-line no-use-before-define -- circular-reference
    TEndpoints extends AnyEndpointsGroupConfig,
    TMethods extends AnyMethodsConfig
> {
    name?: string;

    children?: TEndpoints;

    methods?: TMethods;
}

export type AnyEndpointConfig =
    // eslint-disable-next-line no-use-before-define -- circular-reference
    EndpointConfig<AnyEndpointsGroupConfig, AnyMethodsConfig>;

export type AnyEndpointsGroupConfig =
    Record<string, AnyEndpointConfig>;
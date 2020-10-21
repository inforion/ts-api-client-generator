import { ResponseFromAdapter } from '../adapter';
import {
    Client,
    EndpointFunctionArgument,
    EndpointFunctionReturnValue,
    EndpointsGroup
} from '../client-types';
import {
    AnyClientConfig,
    ClientConfig
} from '../config';
import {
    AnyEndpointConfig,
    AnyEndpointsGroupConfig,
    AnyMethodConfig
} from '../config-parts/endpoints';
import {
    combinePaths,
    mapValues
} from '../utils';

function generateEndpointMethod<
    TResponse,
    TMethod extends AnyMethodConfig,
    TConfig extends AnyClientConfig<TResponse>
>(
    methodConfig: TMethod,
    path: string,
    clientConfig: TConfig
) {
    return async (argument: EndpointFunctionArgument<TMethod>): EndpointFunctionReturnValue<TMethod, TResponse> => (
        clientConfig.adapter.makeRequest(argument, methodConfig, path, clientConfig)
    );
}

function generateEndpointClient<
    TResponse,
    TEndpoint extends AnyEndpointConfig,
    TConfig extends AnyClientConfig<TResponse>
>(
    endpointConfig: TEndpoint,
    name: string,
    parentPath: string,
    clientConfig: TConfig
): EndpointsGroup<TEndpoint, TResponse> {
    const fullName = combinePaths(parentPath, endpointConfig.name ?? name);

    const client = mapValues(
        endpointConfig.children,
        (_name, endpoint) => (
            generateEndpointClient<TResponse, typeof endpoint, typeof clientConfig>(
                endpoint,
                _name,
                fullName,
                clientConfig
            )
        )
    );

    const methods = mapValues(
        endpointConfig.methods,
        (_, method) => (
            generateEndpointMethod<TResponse, typeof method, typeof clientConfig>(
                method,
                fullName,
                clientConfig
            )
        )
    );

    /* @ts-ignore */
    return { ...client, ...methods };
}

export default function generateClient<
    TEndpoints extends AnyEndpointsGroupConfig,
    TConfig extends ClientConfig<TEndpoints, any, any>
>(
    clientConfig: TConfig
): Client<TConfig['endpoints'], ResponseFromAdapter<TConfig['adapter']>> {
    return mapValues(
        clientConfig.endpoints,
        (name, endpoint) => (
            /* @ts-ignore (mutes possible TS2589 error occurred on user side) */
            generateEndpointClient(endpoint, name, clientConfig.basePath, clientConfig)
        )
    );
}
import {
    EndpointFunctionArgument,
    EndpointFunctionReturnValue
} from '../client-types';
import {
    AnyMethodConfig,
    ConnectionConfig
} from '../config-parts';
import { ClientAdapterConfig } from './client-adapter-config';

export abstract class ClientAdapter<TResponse, TContext> {
    protected constructor(
        readonly config?: ClientAdapterConfig<TResponse, TContext>
    ) {}

    public abstract makeRequest<TMethod extends AnyMethodConfig>(
        functionArgument: EndpointFunctionArgument<TMethod>,
        methodConfig: TMethod,
        path: string,
        connectionConfig: ConnectionConfig
    ): EndpointFunctionReturnValue<TMethod, TResponse>;
}

export type AnyClientAdapter = ClientAdapter<any, any>;
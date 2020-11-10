import {
    AnyMethodConfig,
    EndpointConfigContextType,
    EndpointReturnType,
    MethodConfig
} from '../config-parts/endpoints';
import { ApiResponse } from '../request';

export interface EndpointFunctionArgument_<TBody, TParams, TReturn, TContext = undefined> {
    body?: TBody,
    endpointParams?: TParams,
    queryParams?: Record<string, string>,

    additionalHeaders?: Record<string, string>,
    transformResponse?: (response: Response, context?: TContext) => Promise<TReturn>,
    requestOptions?: any
}

export type EndpointFunctionArgument<TMethod extends AnyMethodConfig> =
    TMethod extends MethodConfig<infer TBody, infer TParams, infer TReturn, infer TContext>
        ? EndpointFunctionArgument_<TBody, TParams, TReturn, TContext>
        : never;

export type EndpointFunctionReturnValue<TMethod extends AnyMethodConfig, TResponse> =
    Promise<ApiResponse<EndpointReturnType<TMethod>, EndpointConfigContextType<TMethod>, TResponse>>;

export type EndpointFunction<TMethod extends AnyMethodConfig, TResponse> =
    (arg: EndpointFunctionArgument<TMethod>) => EndpointFunctionReturnValue<TMethod, TResponse>;
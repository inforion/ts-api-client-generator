import { AnyMethodConfig, MethodConfig } from './methods-config';

export type EndpointReturnType<TMethod extends AnyMethodConfig> =
    TMethod['returnStub'];
    /*
    TMethod extends MethodConfig<infer TBody, infer TParams, infer TReturn, infer TContext>
        ? TReturn
        : never;
    */

export type EndpointConfigContextType<TMethod extends AnyMethodConfig> =
    TMethod extends MethodConfig<any, any, any, infer TContext>
        ? TContext
        : never;
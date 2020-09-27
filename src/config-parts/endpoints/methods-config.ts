/* eslint-disable max-classes-per-file */
import { HttpMethod } from './http-method';

export class MethodConfig<TBody = undefined, TParams = undefined, TReturn = void, TContext = undefined> {
    // this property is used only for type inference
    // please see https://github.com/microsoft/TypeScript/issues/40796
    readonly returnStub: TReturn = {} as TReturn;

    constructor(
        readonly method: HttpMethod,
        readonly endpoint: string | ((params: TParams) => string),
        readonly context?: TContext
    ) { }
}

export class MethodConfigNoBody<TParams = undefined, TReturn = void, TContext = undefined>
    extends MethodConfig<undefined, TParams, TReturn, TContext> { }

export type AnyMethodConfig = MethodConfig<any, any, any, any>;

export type AnyMethodsConfig =
    Record<string, AnyMethodConfig>;
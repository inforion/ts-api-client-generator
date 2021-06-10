import { EndpointFunctionArgument } from '../client-types';
import {
    AnyMethodConfig,
    ConnectionConfig
} from '../config-parts';

export function getHeadersCommon<TMethod extends AnyMethodConfig>(
    connectionConfig: ConnectionConfig,
    functionArgument?: EndpointFunctionArgument<TMethod>
): Record<string, string> {
    return {
        ...connectionConfig.additionalHeaders ?? {},
        ...functionArgument?.additionalHeaders ?? {},
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
}
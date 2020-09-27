import { EndpointFunctionArgument } from '../client-types';
import { ConnectionConfig } from '../config-parts';
import { AnyMethodConfig } from '../config-parts/endpoints';

export function getHeadersCommon<TMethod extends AnyMethodConfig>(
    connectionConfig: ConnectionConfig,
    functionArgument?: EndpointFunctionArgument<TMethod>
): Record<string, string> {
    return {
        ...connectionConfig.additionalHeaders ?? { },
        ...functionArgument?.additionalHeaders ?? { },
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
}
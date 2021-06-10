import { combinePaths } from '../utils';
import { getQueryParametersString } from './get-query-parameters-string';

export function getEndpointUrl<TParams>(
    path: string,
    getName: string | ((params: TParams) => string),
    endpointParameters?: TParams,
    queryParameters?: Record<string, string>
): string {
    if (getName instanceof Function && endpointParameters == null) {
        throw new TypeError('Endpoint path parameters should be specified');
    }

    const name = getName instanceof Function
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ? getName(endpointParameters!)
        : getName;

    const fullPath = combinePaths(path, name);

    return queryParameters != null && Object.keys(queryParameters).length > 0
        ? `${fullPath}?${getQueryParametersString(queryParameters)}`
        : fullPath;
}
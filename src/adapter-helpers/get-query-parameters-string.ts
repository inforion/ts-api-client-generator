import {
    JsonValuePrimitive,
    RequestParameterValue
} from './request-parameter-value';

function prependKeyPrefix(key: string, prefix: string): string {
    return prefix == null || prefix.length === 0
        ? key
        : `${prefix}[${key}]`;
}

function encodeValue(value: JsonValuePrimitive): string {
    return encodeURIComponent(String(value));
}

export function getQueryParametersString(
    parameters: Record<string, RequestParameterValue>,
    prefix = ''
): string {
    return Object.entries(parameters)
        .map(([key, value]) => {
            const fullKey = prependKeyPrefix(key, prefix);
            const encodedKey = encodeURIComponent(fullKey);

            if (Array.isArray(value)) {
                const multiValue = value
                    .map((singleValue) => encodeValue(singleValue))
                    .join(`&${encodedKey}=`);

                return `${encodedKey}=${multiValue}`;
            }

            if (typeof value === 'object' && value !== null) {
                return getQueryParametersString(value, fullKey);
            }

            return `${encodedKey}=${encodeValue(value)}`;
        })
        .filter((part) => part.length > 0)
        .join('&');
}
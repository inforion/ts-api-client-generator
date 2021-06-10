export declare type JsonValuePrimitive = string | number | boolean | null;

export type JsonValuePrimitiveArray = Array<JsonValuePrimitive>;

export interface RequestParametersObject {
    // eslint-disable-next-line no-use-before-define -- circular reference
    [name: string]: RequestParameterValue;
}

export type RequestParameterValue = JsonValuePrimitive | JsonValuePrimitiveArray | RequestParametersObject;
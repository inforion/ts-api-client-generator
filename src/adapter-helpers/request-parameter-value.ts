export declare type JsonValuePrimitive = string | number | boolean | null;

export type JsonValuePrimitiveArray = Array<JsonValuePrimitive>;

export interface RequestParametersObject {
    [name: string]: RequestParameterValue;
}

export type RequestParameterValue = JsonValuePrimitive | JsonValuePrimitiveArray | RequestParametersObject;
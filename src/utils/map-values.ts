export type AnyObject = Record<string, unknown>;

export type ObjectKey<TObject extends AnyObject> = string & keyof TObject;

type KeyValueTuple<TObject extends AnyObject> = [ObjectKey<TObject>, TObject[ObjectKey<TObject>]];

declare global {
    interface ObjectConstructor {
        entries<TObject extends AnyObject>(object: TObject): Array<KeyValueTuple<TObject>>;
    }
}

type TransformFunction<TObject extends AnyObject, TNewValue> =
    (key: ObjectKey<TObject>, value: TObject[ObjectKey<TObject>]) => TNewValue;

type TransformedObject<TObject extends AnyObject, TNewValue> = {
    [K in keyof TObject]: TNewValue;
}

export function mapValues<TObject extends AnyObject, TNewValue>(
    object: TObject,
    transform: TransformFunction<TObject, TNewValue>
): TransformedObject<TObject, TNewValue>;

export function mapValues<TObject extends AnyObject, TNewValue>(
    object: TObject | null | undefined,
    transform: TransformFunction<TObject, TNewValue>
): TransformedObject<TObject, TNewValue> | null;

export function mapValues<TObject extends AnyObject, TNewValue>(
    object: TObject | null | undefined,
    transform: TransformFunction<TObject, TNewValue>
): TransformedObject<TObject, TNewValue> | null {
    if (object == null) {
        return null;
    }

    const result = {} as TransformedObject<TObject, TNewValue>;

    Object.entries(object)
        .forEach(([key, value]) => {
            /* @ts-ignore */
            result[key] = transform(key, value);
        });

    return result;
}
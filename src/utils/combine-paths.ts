/* eslint-disable @typescript-eslint/no-non-null-assertion */
function combineTwoPaths(
    basePath: string,
    pathEnding: string
): string {
    const start = /^(.*?)\/*$/.exec(basePath)![1];

    const end = /^\/*(.*)$/.exec(pathEnding)![1];

    return `${start}/${end}`;
}

export function combinePaths(
    basePath: string,
    ...pathParts: Array<string>
): string {
    if (pathParts == null || pathParts.length === 0) {
        return basePath;
    }

    return pathParts.reduce(
        (accumulator, current) => combineTwoPaths(accumulator, current),
        basePath ?? ''
    );
}
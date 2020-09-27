# Typescript Rest API Client Generator

[![NPM version](https://img.shields.io/npm/v/ts-api-client-generator.svg)](https://www.npmjs.com/package/ts-api-client-generator)

## Description

Generates type-aware REST API client from user-provided configuration written with Typescript.

It is allowed to configure the client object to have any structure, e.g. endpoint methods can be grouped into objects of any nesting level. 

## Installation

<u>**Note:** you should also install or create **an [adapter](#adapters)** you would like to use</u>.

Install this package using NPM:

```
npm install ts-api-client-generator
```

or using Yarn:

```
yarn add ts-api-client-generator
```

## Example

```ts
import generateClient, {
    HttpMethod,
    MethodConfig,
    MethodConfigNoBody
} from 'ts-api-client-generator';

interface User {
    firstName: string;
    lastName: string;
}

interface UserEndpointParams {
    id: string;
}

const client = generateClient({
    endpoints: {
        appData: {
            name: 'app-data', // optional, if not specified, appData will be used as an URL part
            children: {
                users: {
                    methods: {
                        get: new MethodConfigNoBody<UserEndpointParams, User>(
                            HttpMethod.Get,
                            (id) => `id-${id}`
                            /* third argument is optional and can contain any context for custom value transforms */
                        ),
                        put: new MethodConfig<User, UserEndpointParams>(
                            HttpMethod.Put,
                            (id) => `id-${id}`
                        )
                    }
                }
                /* other endpoint groups can be here */
            }
            /* 'methods' property can be inside any endpoint group config */
        }
        /* other endpoint groups can be here */
    },

    basePath: 'https://192.168.100.100:50000/api',

    adapter: /* an adaper, please see 'adapters' section */,

    credentials: { // optional, used for HTTP Basic Auth
        login: 'login',
        password: 'password'
    },
    
    additionalHeaders: { // optional
        'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Linux i686; rv:2.0.1) Gecko/20100101 Firefox/4.0.1'
    }
});

// GET https://192.168.100.100:50000/api/app-data/users/id-4032e1f65a89487fad4af15fd99f323e
const getUserResponse = await client.appData.users.get({
    endpointParams: {
        id: '4032e1f65a89487fad4af15fd99f323e'
    }
});

const user = await getUserResponse.value();

// PUT https://192.168.100.100:50000/api/app-data/users/id-d6fa948265e143f4abe1d9b2c7e6a4c8
await client.appData.users.put({
    endpointParams: {
        id: 'd6fa948265e143f4abe1d9b2c7e6a4c8'
    },
    body: {
        firstName: 'Eddie',
        lastName: 'Johnson'
    }
    // another available arguments are:
    //
    // * queryParams?: Record<string, string>
    // * additionalHeaders?: Record<string, string>
    // * transformResponse?: (response: Response, context?: TContext) => Promise<TReturn>
    //
    // transformResponse for all endpoints can also be specified in adapter config
})
```

## Adapters

### What is an adapter?

An adapter is a module that performs HTTP requests. Its instance should be passed into [client configuration](#example).

This means you can use any HTTP request library with this package, the only thing you should do is to find an existing adapter for needed library or write your own one.

### Available adapters

* [fetch](https://github.com/inforion/ts-api-client-generator-fetch)
* [node-fetch](https://github.com/inforion/ts-api-client-generator-node-fetch)

### Custom response transform for every endpoint

Base adapter configuration contains `transformResponse` property. It is a function that constructs value from raw library response.

For example, the default `transformResponse` for fetch adapter gets JSON from response and casts it to `T`: `<T>(response: Response) => response.json() as Promise<T>`.

If you use a library for deserializing JSON into classes, for example, [TaJson](https://www.npmjs.com/package/ta-json), you can write:

```ts
const adapterConfig = {
    transformResponse: <TReturn>(
        response: Response, // Response type may differ for different HTTP libraries
        context?: new () => TReturn // context is specified in config, there you can pass classes for deserialization as context
    ): Promise<TReturn> => (
        response.text()
            .then((text) => TaJson.parse(text, context))
    )
}
```

### Write custom adapter

Import base adapter class and implement it.

```ts
import { ClientAdapter } from 'ts-api-client-generator'
```

##### Type arguments
* `TResponse`: type of response returned by your HTTP library
* `TContext`: any value provided from endpoint method config

##### `makeRequest` arguments
* `functionArgument`: everything user passes to generated endpoint methods
* `methodConfig`: endpoint method configuration
* `path`: base URL of current endpoint
* `connectionConfig`: connection configuration provided to `generateClient` function

##### Helpers

There are some useful helpers for implementing adapters, please see 'src/adapter-helpers' folder. This package exports all of them.
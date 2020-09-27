import { Credentials } from './credentials';

export interface ConnectionConfig {
    basePath: string;

    credentials?: Credentials;

    additionalHeaders?: Record<string, string>;
}
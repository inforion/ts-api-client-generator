import { AnyEndpointsGroupConfig } from './endpoints-config';

export interface IHaveEndpoints<TEndpoints extends AnyEndpointsGroupConfig> {
    endpoints: TEndpoints;
}
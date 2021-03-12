import { InjectionToken } from '@angular/core';
import {
    ICostsClient,
    IDataSourceClient,
    IGroupsClient,
    IPowerFactorClient
} from './web-api-client';

export const DATA_SOURCE_CLIENT = new InjectionToken<IDataSourceClient>(
    'DATA_SOURCE_CLIENT'
);

export const GROUPS_CLIENT = new InjectionToken<IGroupsClient>('GROUPS_CLIENT');

export const COSTS_CLIENT = new InjectionToken<ICostsClient>('COSTS_CLIENT');

export const POWER_FACTOR_CLIENT = new InjectionToken<IPowerFactorClient>(
    'POWER_FACTOR_CLIENT'
);

import { InjectionToken } from '@angular/core';
import {
    ICostsClient,
    IDataSourceClient,
    IPowerFactorClient
} from './web-api-client';

export const DATA_SOURCE_CLIENT = new InjectionToken<IDataSourceClient>(
    'DATA_SOURCE_CLIENT'
);

export const COSTS_CLIENT = new InjectionToken<ICostsClient>('COSTS_CLIENT');

export const POWER_FACTOR_CLIENT = new InjectionToken<IPowerFactorClient>(
    'POWER_FACTOR_CLIENT'
);

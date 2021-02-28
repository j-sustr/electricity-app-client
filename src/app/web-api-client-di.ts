import { InjectionToken } from '@angular/core';
import { ICostsClient, IPowerFactorClient } from './web-api-client';

export const POWER_FACTOR_CLIENT = new InjectionToken<IPowerFactorClient>(
    'POWER_FACTOR_CLIENT'
);

export const COSTS_CLIENT = new InjectionToken<ICostsClient>('COSTS_CLIENT');

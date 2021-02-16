import { InjectionToken } from '@angular/core';
import { IPowerFactorClient } from './web-api-client';

export const POWER_FACTOR_CLIENT = new InjectionToken<IPowerFactorClient>(
    'POWER_FACTOR_CLIENT'
);

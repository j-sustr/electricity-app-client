import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app-store.state';
import { PowerFactorOverviewState } from './power-factor-overview.model';

export const selectPowerFactorOverview = createFeatureSelector<
    AppState,
    PowerFactorOverviewState
>('powerFactorOverview');

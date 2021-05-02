/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, ActionsSubject, ActionCreator } from '@ngrx/store';
import { AppState } from './app/app-store.state';
import * as cdActions from './app/costs-detail/costs-detail.actions';
import * as coActions from './app/costs-overview/costs-overview.actions';
import * as pfoActions from './app/power-factor-overview/power-factor-overview.actions';
import * as pfdActions from './app/power-factor-detail/power-factor-detail.actions';
import * as pdoActions from './app/peak-demand-overview/peak-demand-overview.actions';
import * as pddActions from './app/peak-demand-detail/peak-demand-detail.actions';
import { ofType } from '@ngrx/effects';
import { setIntervals } from './app/data-source/data-source.actions';
import { take, tap } from 'rxjs/operators';

const intervals = [];
const repetitions = 100;

interface TestContext {
    store: Store<AppState>;
    actionsSubject: ActionsSubject;
}

interface OverviewActions {
    getOverview: ActionCreator;
    getOverviewSuccess: ActionCreator;
    getOverviewError: ActionCreator;
}

interface DetailActions {
    getDetail: ActionCreator;
    getDetailSuccess: ActionCreator;
    getDetailError: ActionCreator;
}

async function runPerformanceTest(context: TestContext) {
    const results: any = [];
    let progress = 0;
    progress++;

    console.log(`performance test progress: ${progress}`);

    console.log('performance test done');

    context.store.dispatch(
        setIntervals({
            interval1: {
                start: new Date(),
                end: new Date()
            }
        })
    );

    await testGetOverview(context, coActions);

    await testGetDetail(context, cdActions);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (window as any).performanceTestResutls = results;
}

function testGetOverview(
    context: TestContext,
    actions: OverviewActions
): Promise<void> {
    return new Promise((resolve, reject) => {
        context.store.dispatch(coActions.getOverview());
        context.actionsSubject
            .pipe(
                ofType(
                    coActions.getOverviewSuccess,
                    coActions.getOverviewError
                ),
                take(1),
                tap((action) => {
                    if (action.type.includes('Error')) {
                        reject();
                        return;
                    }
                    resolve();
                })
            )
            .subscribe();
    });
}

function testGetDetail(
    context: TestContext,
    actions: DetailActions
): Promise<void> {
    return new Promise((resolve, reject) => {
        context.store.dispatch(cdActions.getDetail());
        context.actionsSubject
            .pipe(
                ofType(cdActions.getDetailSuccess, cdActions.getDetailError),
                take(1),
                tap((action) => {
                    if (action.type.includes('Error')) {
                        reject();
                        return;
                    }
                    resolve();
                })
            )
            .subscribe();
    });
}

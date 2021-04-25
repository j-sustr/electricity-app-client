/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from './app/app-store.state';

const intervals = [];
const repetiotions = 100;

function runPerformanceTest(
    store: Store<AppState>,
    actionsSubject: ActionsSubject
) {
    const results: any = [];
    let progress = 0;
    progress++;

    console.log(`performance test progress: ${progress}`);

    console.log('performance test done');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (window as any).performanceTestResutls = results;
}

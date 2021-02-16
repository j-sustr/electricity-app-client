import { Component, Inject } from '@angular/core';
import { IPowerFactorClient, PowerFactorClient } from './web-api-client';
import { POWER_FACTOR_CLIENT } from './web-api-client-di';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-electricity-app';

    items = ['hello', 'dafd', 'da'];

    min = new Date(2021, 0, 1);
    max = new Date(2021, 2, 2);

    constructor(
        @Inject(POWER_FACTOR_CLIENT)
        private powerFactorClient: IPowerFactorClient
    ) {
        (window as any).powerFactorClient = powerFactorClient;
    }
}

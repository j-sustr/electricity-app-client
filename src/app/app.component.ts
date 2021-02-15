import { Component } from '@angular/core';
import { PowerFactorClient } from './web-api-client';

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

    constructor(private powerFactorClient: PowerFactorClient) {
        // (window as any).powerFactorClient = powerFactorClient;
    }
}

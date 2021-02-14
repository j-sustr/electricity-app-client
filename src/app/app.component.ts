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

    constructor(private powerFactorClient: PowerFactorClient) {
        // (window as any).powerFactorClient = powerFactorClient;
    }
}

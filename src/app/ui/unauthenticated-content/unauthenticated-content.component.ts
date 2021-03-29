import { Component } from '@angular/core';

@Component({
    selector: 'app-unauthenticated-content',
    template: `
        <app-single-card [title]="title" [description]="description">
            <router-outlet></router-outlet>
        </app-single-card>
    `,
    styleUrls: ['./unauthenticated-content.component.ts']
})
export class UnauthenticatedContentComponent {}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {
    @Input()
    title?: string;

    @Input()
    description?: string;
}

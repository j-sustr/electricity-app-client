import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store.state';

type ViewTypeOption = {
    text: string;
    key: 'table' | 'chart';
};

@Component({
    selector: 'app-view-control-bar',
    templateUrl: './view-control-bar.component.html',
    styleUrls: ['./view-control-bar.component.scss']
})
export class ViewControlBarComponent {
    viewTypeOptions: ViewTypeOption[] = [
        {
            text: 'Table',
            key: 'table'
        },
        {
            text: 'Chart',
            key: 'chart'
        }
    ];

    @Input()
    viewTypeControl = true;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {}

    viewTypeItemClick(event: unknown): void {
        console.log(event);
    }
}

function mapRoutePathToViewTypeSelector() {}

function mapRoutePathToSetViewTypeAction() {}

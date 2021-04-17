import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    selectSelectedGroup,
    selectGroupTreeView
} from 'src/app/app/groups/groups.selectors';

import { DetailViewControlsComponent } from './detail-view-controls.component';

describe('DetailViewControlsComponent', () => {
    let component: DetailViewControlsComponent;
    let fixture: ComponentFixture<DetailViewControlsComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailViewControlsComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectSelectedGroup, {
            id: 'test-group-id',
            name: 'test-group-name',
            archives: [
                {
                    arch: 0,
                    count: 1000,
                    range: null,
                    intervals: null
                }
            ],
            subgroups: null
        });
        store.overrideSelector(selectGroupTreeView, {
            items: null,
            loading: false
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailViewControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

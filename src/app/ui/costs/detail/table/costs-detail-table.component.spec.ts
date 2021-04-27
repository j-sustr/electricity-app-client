import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectDetailTable } from 'src/app/app/costs-detail/costs-detail.selectors';
import { CostsDetailTableComponent } from './costs-detail-table.component';

describe('CostsDetailTableComponent', () => {
    let component: CostsDetailTableComponent;
    let fixture: ComponentFixture<CostsDetailTableComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CostsDetailTableComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDetailTable, {
            items: [],
            comparison: false
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CostsDetailTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

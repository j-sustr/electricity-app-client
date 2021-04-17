import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectDetail } from 'src/app/app/costs-detail/costs-detail.selectors';
import { CostsDetailComponent } from './costs-detail.component';

describe('CostsDetailComponent', () => {
    let component: CostsDetailComponent;
    let fixture: ComponentFixture<CostsDetailComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CostsDetailComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectDetail, {
            groupName: 'test-group-1',
            items1: [],
            items2: [],
            loading: false
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CostsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

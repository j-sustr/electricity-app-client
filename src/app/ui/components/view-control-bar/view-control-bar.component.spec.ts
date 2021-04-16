import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectRouterPath } from 'src/app/app/common/router/router.selectors';
import { selectPhases } from 'src/app/app/data-source/data-source.selectors';
import { ViewControlBarComponent } from './view-control-bar.component';
import { ViewControlBarModule } from './view-control-bar.module';

describe('ViewControlBarComponent', () => {
    let component: ViewControlBarComponent;
    let fixture: ComponentFixture<ViewControlBarComponent>;
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewControlBarModule],
            declarations: [ViewControlBarComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectPhases, {
            main: true,
            l1: false,
            l2: false,
            l3: false
        });
        store.overrideSelector(selectRouterPath, '/costs/overview');
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewControlBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

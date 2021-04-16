import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectIsAuthenticated } from './app/auth/auth.selectors';
import { PowerFactorClient } from './web-api-client';
import { POWER_FACTOR_CLIENT } from './web-api-client-di';

describe('AppComponent', () => {
    let store: MockStore<unknown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [AppComponent],
            providers: [
                provideMockStore(),
                {
                    provide: POWER_FACTOR_CLIENT,
                    useClass: PowerFactorClient
                }
            ]
        }).compileComponents();

        store = TestBed.inject<MockStore<unknown>>(MockStore);
        store.overrideSelector(selectIsAuthenticated, false);
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});

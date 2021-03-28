import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error?: HttpErrorResponse;
}

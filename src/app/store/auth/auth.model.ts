import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
    isAuthenticated: boolean;
    username: string;
    loading: boolean;
    error?: HttpErrorResponse;
}

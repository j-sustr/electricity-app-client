import { HttpErrorResponse } from '@angular/common/http';

export interface User {
    username: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error?: HttpErrorResponse;
}

import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    default(message: string): void {
        this.show(message, {
            type: 'default',
            duration: 2000
        });
    }

    info(message: string): void {
        this.show(message, {
            type: 'info',
            duration: 2000
        });
    }

    success(message: string): void {
        this.show(message, {
            type: 'success',
            duration: 2000
        });
    }

    warn(message: string): void {
        this.show(message, {
            type: 'warning',
            duration: 2500
        });
    }

    error(message: string): void {
        this.show(message, {
            type: 'error',
            duration: 3000
        });
    }

    private show(
        message: string,
        configuration: { type: string; duration: number }
    ) {
        notify(message, configuration.type, configuration.duration);
    }
}

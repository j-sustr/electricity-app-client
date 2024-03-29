import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notifications/notifications.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
    constructor(private notificationsService: NotificationService) {
        super();
    }

    handleError(error: Error | HttpErrorResponse): void {
        let displayMessage = 'An error occurred.';

        if (!environment.production) {
            displayMessage += ' See console for details.';
        }

        this.notificationsService.error(displayMessage);

        super.handleError(error);
    }
}

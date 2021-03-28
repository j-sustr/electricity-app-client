import { Injectable } from '@angular/core';

const APP_PREFIX = 'ELECTRICITY-';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    static loadInitialState<T>(): T {
        return Object.keys(localStorage).reduce((state, storageKey) => {
            if (storageKey.includes(APP_PREFIX)) {
                const stateKeys = storageKey
                    .replace(APP_PREFIX, '')
                    .toLowerCase()
                    .split('.')
                    .map((key) =>
                        key
                            .split('-')
                            .map((token, index) =>
                                index === 0
                                    ? token
                                    : token.charAt(0).toUpperCase() +
                                      token.slice(1)
                            )
                            .join('')
                    );

                let currentStateRef = state as never;
                stateKeys.forEach((key, index) => {
                    if (index === stateKeys.length - 1) {
                        currentStateRef[key] = JSON.parse(
                            localStorage.getItem(storageKey) as string
                        ) as never;
                        return;
                    }
                    currentStateRef[key] = currentStateRef[key] || {};
                    currentStateRef = currentStateRef[key];
                });
            }
            return state;
        }, {}) as T;
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }

    getItem<T>(key: string): T {
        return JSON.parse(
            localStorage.getItem(`${APP_PREFIX}${key}`) as string
        ) as T;
    }

    removeItem(key: string): void {
        localStorage.removeItem(`${APP_PREFIX}${key}`);
    }

    /** Tests that localStorage exists, can be written to, and read from. */
    testLocalStorage(): void {
        const testValue = 'testValue';
        const testKey = 'testKey';
        const errorMessage = 'localStorage did not return expected value';

        this.setItem(testKey, testValue);
        const retrievedValue = this.getItem(testKey);
        this.removeItem(testKey);

        if (retrievedValue !== testValue) {
            throw new Error(errorMessage);
        }
    }
}

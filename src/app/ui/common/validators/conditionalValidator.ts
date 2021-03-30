import { ValidatorFn } from '@angular/forms';

export function conditionalValidator(
    predicate: () => boolean,
    validator: ValidatorFn
): ValidatorFn {
    return (formControl) => {
        if (!formControl.parent) {
            return null;
        }
        if (predicate()) {
            return validator(formControl);
        }
        return null;
    };
}

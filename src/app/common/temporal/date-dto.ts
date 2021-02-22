import { isDate, toDate } from 'date-fns';

export function toDateDto(date: Date | number): Date | null {
    if (isDate(date)) {
        return date as Date;
    }
    if (Number.isFinite(date)) {
        return toDate(date);
    }
    return null;
}

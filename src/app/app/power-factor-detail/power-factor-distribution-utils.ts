import { DistributionRange } from './power-factor-detail.model';

export function getDistributionRange(
    action: unknown
): DistributionRange | null {
    if (isDistributionRange(action)) {
        return {
            start: action.start,
            end: action.end
        };
    }
    return null;
}

export function isDistributionRange(
    value: unknown
): value is DistributionRange {
    const maybeRange = value as DistributionRange;
    if (typeof maybeRange?.start !== 'number') {
        return false;
    }
    if (typeof maybeRange?.end !== 'number') {
        return false;
    }
    return true;
}

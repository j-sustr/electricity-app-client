import {
    ArchiveInfoDto,
    DateRangeDto,
    GroupInfoDto,
    IntervalDto
} from 'src/app/web-api-client';
import { ArchiveInfo, GroupInfo } from '../groups/groups.model';

export function createGroupInfoFromDto(dto: GroupInfoDto): GroupInfo {
    dto.subgroups = isEmptyArray(dto.subgroups) ? null : dto.subgroups;
    dto.archives = isEmptyArray(dto.archives) ? null : dto.archives;
    return {
        id: dto.id ?? '(no id)',
        name: dto.name ?? '(no name)',
        archives: dto.archives?.map((a) => createArchiveInfoFromDto(a)) ?? null,
        subgroups: dto.subgroups?.map((g) => createGroupInfoFromDto(g)) ?? null
    };
}

export function createArchiveInfoFromDto(
    dto: ArchiveInfoDto | null
): ArchiveInfo | null {
    if (!isArchiveInfoDto(dto)) {
        return null;
    }
    dto.intervals = isEmptyArray(dto.intervals) ? null : dto.intervals;
    return {
        arch: dto.arch ?? -1,
        count: dto.count ?? -1,
        range: dto.range ? createIntervalFromDateRangeDto(dto.range) : null,
        intervals:
            dto.intervals?.map((int) => createIntervalFromDateRangeDto(int)) ??
            null
    };
}

export function createIntervalFromDateRangeDto(dto: DateRangeDto): Interval {
    return {
        start: dto.dateMin ?? NaN,
        end: dto.dateMax ?? NaN
    };
}

export function createIntervalFromDto(dto: IntervalDto): Interval {
    return {
        start: dto.start ?? NaN,
        end: dto.end ?? NaN
    };
}

function isArchiveInfoDto(value: unknown): value is ArchiveInfoDto {
    if (typeof value === 'object' && value !== null) {
        if ('arch' in value) {
            return true;
        }
    }
    return false;
}

function isEmptyArray(value: unknown): value is Array<never> {
    return Array.isArray(value) && value.length === 0;
}

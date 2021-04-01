/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import * as tablesModule from './eru-tables.json';

export type ERUTableKey = keyof typeof tablesModule;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tables = (tablesModule as any).default;

@Injectable({
    providedIn: 'root'
})
export class ERUTableCollection {
    getValue(id: ERUTableKey): number {
        const value = (tables[id] as any).value as unknown;
        if (typeof value !== 'number') {
            throw new Error(`Value "${id}" is not a number`);
        }
        return value;
    }

    getTable(id: ERUTableKey): ERUTable {
        const table = (tables[id] as any).table as Record<string, unknown[]>;
        return new ERUTable(table);
    }

    getRecordValue(id: ERUTableKey, key: string): number {
        const record = (tables[id] as any).record as Record<string, number>;
        const value = record[key];
        if (typeof value !== 'number') {
            throw new Error(`Record value "${id}[${key}]" is not a number`);
        }
        return value;
    }
}

export class ERUTable {
    constructor(private _table: Record<string, unknown[]>) {}

    getValue(row: string, col: string): number {
        const rowValues = this._table[row];
        const colIdx = this._table['$0'].indexOf(col);
        const value = rowValues[colIdx];
        if (typeof value !== 'number') {
            throw new Error(`Table value [${row},${col}] is not a number`);
        }
        return value;
    }
}

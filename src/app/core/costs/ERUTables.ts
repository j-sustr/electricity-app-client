/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as tables from './eru-tables.json';

export type ERUTableKey = keyof typeof tables;

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
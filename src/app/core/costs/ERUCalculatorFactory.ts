import { Injectable } from '@angular/core';
import { CustomerParams } from './costs';
import ERUCalculator from './ERUCalculator';
import { ERUTableCollection } from './ERUTables';

@Injectable({
    providedIn: 'root'
})
export default class ERUCalculatorFactory {
    constructor(private _tables: ERUTableCollection) {}

    create(customer: CustomerParams): ERUCalculator {
        return new ERUCalculator(this._tables, customer);
    }
}

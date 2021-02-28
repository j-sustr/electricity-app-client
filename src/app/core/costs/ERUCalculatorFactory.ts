import { CustomerParams } from './costs';
import ERUCalculator from './ERUCalculator';
import { ERUTableCollection } from './ERUTables';

export default class ERUCalculatorFactory {
    constructor(private _tables: ERUTableCollection) {}

    create(customer: CustomerParams): ERUCalculator {
        return new ERUCalculator(this._tables, customer);
    }
}

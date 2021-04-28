import { getMonthName } from 'src/app/common/temporal/temporal-utils';
import { calculateCostsItemsForMonth } from './calculate-costs-detail-item';
import { CustomerParams } from './costs';
import ERUCalculator from './ERUCalculator';
import { ERUTableCollection } from './ERUTables';

describe('calculateCostsDetailItemForMonth()', () => {
    function createCalculator(customerParams: CustomerParams) {
        const tables = new ERUTableCollection();
        return new ERUCalculator(tables, customerParams);
    }

    it('should calculate costs for VN customer with slightly bad cos FI', () => {
        const calculator = createCalculator({
            isSupplier: false,
            voltageLevel: 'VN',
            dsOperator: 'CEZ',
            reservedPowerKW: 210,
            yearlyReservedCapacityKW: 30,
            monthlyReservedCapacityKW: 0
        });

        const items = calculateCostsItemsForMonth(
            {
                year: 2021,
                month: 5,
                activeEnergy: 4770000,
                reactiveEnergy: 2589000,
                peakDemand: 12000,
                cosFi: 0.9
            },
            calculator
        );

        const yearMonth = {
            year: 2021,
            month: getMonthName(4)
        };

        const currency = 'CZK';

        console.log('cost items', items);

        expect(items).toEqual([
            {
                ...yearMonth,
                itemName: 'Active Energy',
                quantity: '4.770',
                unit: 'MWh'
            }, // 0
            {
                ...yearMonth,
                itemName: 'cos FI',
                quantity: '0.90000',
                unit: '-'
            }, // 1
            {
                ...yearMonth,
                itemName: 'Maximum Demand',
                quantity: '0.012',
                unit: 'MW'
            }, // 2
            {
                ...yearMonth,
                itemName: 'Reactive Energy',
                quantity: '2.589',
                unit: 'MVArh',
                currency,
                costPerUnit: 440,
                cost: 1139.16
            }, // 3
            {
                ...yearMonth,
                itemName: 'Reserved power exceed cost',
                quantity: '0.000',
                unit: 'MW',
                currency,
                costPerUnit: 791684,
                cost: 0
            }, // 4
            {
                ...yearMonth,
                itemName: 'Reserved capacity exceed cost',
                quantity: '0.000',
                unit: 'MW',
                currency,
                costPerUnit: 354062,
                cost: 4248.744
            }, // 5
            {
                ...yearMonth,
                itemName: 'Yearly reserved capacity cost',
                quantity: '0.030',
                unit: 'MW',
                currency,
                costPerUnit: 177031,
                cost: 5310.929999999999
            }, // 6
            {
                ...yearMonth,
                itemName: 'Monthly reserved capacity cost',
                quantity: '0.000',
                unit: 'MW',
                currency,
                costPerUnit: 197921,
                cost: 0
            }, // 7
            {
                ...yearMonth,
                itemName: 'Power Factor Penalty - tg FI>0.328',
                quantity: '48',
                unit: '%',
                currency,
                cost: 12842.252639525688
            } // 8
        ]);
    });
});

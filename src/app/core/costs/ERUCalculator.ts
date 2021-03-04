/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    compareDecimalPlaces,
    toMega
} from 'src/app/common/number/number-utils';
import { CustomerParams, DSOperator, VoltageLevel } from './costs';
import { ERUTableCollection } from './ERUTables';

export default class ERUCalculator {
    readonly voltageLevel: VoltageLevel;
    readonly dsOperator: DSOperator;
    readonly reservedPower: number;
    readonly yearlyReservedCapacity: number;
    readonly monthlyReservedCapacity: number;
    readonly _isSupplier = false;

    constructor(private _tables: ERUTableCollection, customer: CustomerParams) {
        this.voltageLevel = customer.voltageLevel;
        this.dsOperator = customer.dsOperator;
        this.reservedPower = customer.reservedPowerKW * 1000;
        this.yearlyReservedCapacity = customer.yearlyReservedCapacityKW * 1000;
        this.monthlyReservedCapacity =
            customer.monthlyReservedCapacityKW * 1000;
    }

    reactiveEnergySupplyCostPerUnit(): number {
        return this._tables.getValue('4.54.');
    }

    /**
     * @returns [Kč/MW]
     */
    yearlyReservedCapacityCostPerUnit(): number {
        const vl = this.voltageLevel;
        if (vl === 'NN') {
            return 0;
        }
        return this._tables
            .getTable('4.17.')
            .getValue(this.dsOperator, vl + '-r');
    }

    /**
     * @returns [Kč/MW]
     */
    monthlyReservedCapacityCostPerUnit(): number {
        const vl = this.voltageLevel;
        if (vl === 'NN') {
            return 0;
        }
        return this._tables
            .getTable('4.17.')
            .getValue(this.dsOperator, vl + '-m');
    }

    yearlyReservedCapacityCost(): number {
        const costPerUnit = this.yearlyReservedCapacityCostPerUnit();
        return costPerUnit * toMega(this.yearlyReservedCapacity);
    }

    monthlyReservedCapacityCost(): number {
        const costPerUnit = this.monthlyReservedCapacityCostPerUnit();
        return costPerUnit * toMega(this.monthlyReservedCapacity);
    }

    /**
     * @returns [Kč/MW]
     */
    reservedCapacityOverrunCostPerUnit(): number {
        return 2 * this.yearlyReservedCapacityCostPerUnit();
    }

    /**
     * @param overrun  [kW]
     *
     * @returns [Kč]
     */
    reservedCapacityOverrunCost(overrun: number): number {
        return (overrun * this.reservedCapacityOverrunCostPerUnit()) / 1000;
    }

    /**
     * @param pmax P_max [kW] je nejvyšší naměřený čtvrthodinový odebraný elektrický výkon za vyhodnocované období,
     *
     * @returns [kW]
     */
    reservedCapacityOverrun(pmax: number): number {
        /*
        (4.23.) Cena za překročení rezervované kapacity v kalendářním měsíci je rovna
        dvojnásobku měsíční ceny za roční rezervovanou kapacitu podle bodu (4.17.) přepočtené na
        kW vztaženého na každý kW nejvyššího překročení sjednané rezervované kapacity pro
        základní způsob zapojení odběrného nebo předávacího místa podle bodu (4.2.) nebo bodu
        (4.13.) čtvrthodinovým maximálním odebraným elektrickým výkonem. Pokud není roční
        rezervovaná kapacita v daném měsíci sjednána, je základem pro stanovení ceny
        za překročení rezervované kapacity měsíční cena za měsíční rezervovanou kapacitu podle
        bodu (4.17.).
        */
        const capacity = Math.trunc(
            (this.yearlyReservedCapacity + this.monthlyReservedCapacity) / 1000
        );

        return Math.max(pmax - capacity, 0);
    }

    /**
     * @returns [Kč/MW]
     */
    reservedPowerOverrunCostPerUnit(): number {
        /*
        (4.30.) Cena za překročení rezervovaného příkonu podle vyhlášky o podmínkách
        připojení k elektrizační soustavě pro místo připojení zákazníka, výrobce elektřiny nebo
        provozovatele lokální distribuční soustavy sjednaného ve smlouvě o připojení je rovna
        čtyřnásobku měsíční ceny za měsíční rezervovanou kapacitu podle bodu (4.17.).
        */
        return 4 * this.monthlyReservedCapacityCostPerUnit();
    }

    /**
     *  @param pmax P_max [kW] je nejvyšší naměřený čtvrthodinový odebraný elektrický výkon za vyhodnocované období,
     *
     *  @returns [kW]
     */
    reservedPowerOverrun(pmax: number): number {
        const power = Math.trunc(this.reservedPower / 1000);

        return Math.max(pmax - power, 0);
    }

    /**
     * @param overrun  [kW]
     *
     * @returns [Kč]
     */
    reservedPowerOverrunCost(overrun: number): number {
        /*
        (4.31.) Vyhodnocení překročení rezervovaného příkonu provádí provozovatel
        distribuční soustavy měsíčně. Překročení rezervovaného příkonu je vztaženo na každý kW
        nejvyššího překročení sjednaného rezervovaného příkonu čtvrthodinovým maximálním
        odebraným elektrickým výkonem v místě připojení. Není-li ve smlouvě o připojení
        rezervovaný příkon sjednán na místo připojení, pak je překročení rezervovaného příkonu
        vztaženo k rezervovanému příkonu sjednanému ve smlouvě o připojení.
        */
        return (overrun * this.reservedPowerOverrunCostPerUnit()) / 1000;
    }

    /**
     * Unsoclicited reactive energy supply cost
     *
     * @param totalEnergy  [MVArh]
     */
    reactiveEnergySupplyCost(totalEnergy: number): number {
        return totalEnergy * this.reactiveEnergySupplyCostPerUnit();
    }

    powerFactorSurcharge(cosFi: number): number {
        const tbl = this._tables.getTable('4.52.');
        const zones = Array.from({ length: 5 }).map((_, i) =>
            (i + 1).toString()
        );
        for (const zone of zones) {
            const min = tbl.getValue(zone, 'cosFiMin');
            const max = tbl.getValue(zone, 'cosFiMax');

            // Hodnota tg Fi pro určení přirážky se zaokrouhlí na tři desetinná místa dolů
            if (
                compareDecimalPlaces(cosFi, min, 3) >= 0 &&
                compareDecimalPlaces(cosFi, max, 3) <= 0
            ) {
                return tbl.getValue(zone, 'prirazka');
            }
        }

        throw new Error('invalid cosFi value');
    }

    /**
     * (4.53.) Cena za nedodržení účiníku je stanovena jako součin hodnot nejvyššího
     * naměřeného čtvrthodinového odebraného elektrického výkonu za vyhodnocované období,
     * ceny za rezervovanou kapacitu na příslušné napěťové hladině a odpovídající hodnoty
     * přirážky (přirážka podle tabulky uvedené v bodě (4.52.)) a jako součet ceny za použití sítí
     * na příslušné napěťové hladině a ceny za silovou elektřinu podle tabulky,
     * vynásobený odpovídající hodnotou přirážky (přirážka podle tabulky uvedené v bodě
     * (4.52.)) a množstvím elektřiny za vyhodnocované období
     *
     * @param pmax  P_max [MW] je nejvyšší naměřený čtvrthodinový odebraný elektrický výkon za vyhodnocované období,
     * @param u  u [-] je přirážka za nedodržení účiníku podle tabulky uvedené v bodě (4.52.),
     * @param w  W [MWh] je množství elektřiny za vyhodnocované období.
     *
     * @returns  c_p [Kč] je cena za nedodržení účiníku,
     */
    powerFactorPenalty(pmax: number, u: number, w: number): number {
        const crk = this._getCRK();
        const cps = this._getCPS();
        const cse = this._getCSE();

        return pmax * crk * u * ((cps + cse) * u * w);
    }

    /**
     * @returns c_rk [Kč/MW] je cena za rezervovanou kapacitu na příslušné napěťové hladině,
     */
    _getCRK(): number {
        let vl = this.voltageLevel;
        const rc = 'r'; // roční, TODO: ma to byt rocni, mecicni nebo spocitana

        // nn je stejne jako vn
        if (this.voltageLevel === 'NN') {
            vl = 'VN';
        }

        return this._tables
            .getTable('4.17.')
            .getValue(this.dsOperator, vl + '-' + rc);
    }

    /**
     * @returns c_ps [Kč/MWh] je cena za použití sítí na příslušné napěťové hladině,
     */
    _getCPS(): number {
        let vl = this.voltageLevel;

        // nn je stejne jako vn
        if (this.voltageLevel === 'NN') {
            vl = 'VN';
        }

        return this._tables.getTable('4.38.').getValue(this.dsOperator, vl);
    }

    /**
     * @returns  c_se [Kč/MWh] je cena za silovou elektřinu podle tabulky uvedené v bodě (4.53.),
     */
    _getCSE(): number {
        return this._tables.getRecordValue('4.53.', this.dsOperator);
    }
}

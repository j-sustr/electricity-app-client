export const DS_OPERATORS = ['CEZ', 'EON', 'PRE', 'UCED', 'SVS'] as const;

export const VOLTAGE_LEVELS = ['NN', 'VN', 'VVN'] as const;

export type DSOperator = typeof DS_OPERATORS[number];

export type VoltageLevel = typeof VOLTAGE_LEVELS[number];

export interface CustomerParams {
    isSupplier: boolean;
    voltageLevel: VoltageLevel;
    dsOperator: DSOperator;
    reservedPowerKW: number;
    yearlyReservedCapacityKW: number;
    monthlyReservedCapacityKW: number;
}

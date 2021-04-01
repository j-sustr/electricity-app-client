import { CustomerParams } from 'src/app/domain/costs/costs';

export interface CostsState {
    customerParams: CustomerParams | null;
}

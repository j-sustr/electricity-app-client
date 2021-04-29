import { CustomerParams } from 'src/app/domain/costs/costs';

export interface CostsState {
    isCustomerParamsPopupFormOpen: boolean;
    customerParams: CustomerParams | null;
}

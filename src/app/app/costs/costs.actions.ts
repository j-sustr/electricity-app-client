import { createAction, props } from '@ngrx/store';
import { CustomerParams } from 'src/app/domain/costs/costs';

export const setCustomerParams = createAction(
    '[Costs] Set Customer Params',
    props<{ params: CustomerParams | null }>()
);

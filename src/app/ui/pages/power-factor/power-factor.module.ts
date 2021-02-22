import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatetimeRangePickerModule } from '../../components/datetime-range-picker/datetime-range-picker.module';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DatetimeRangePickerModule,
        PowerFactorRoutingModule
    ],
    exports: [],
    declarations: [PowerFactorDetailComponent, PowerFactorOverviewComponent],
    providers: []
})
export class PowerFactorModule {}

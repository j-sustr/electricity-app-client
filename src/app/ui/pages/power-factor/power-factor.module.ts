import { NgModule } from '@angular/core';
import { PowerFactorDetailComponent } from './detail/power-factor-detail.component';
import { PowerFactorOverviewComponent } from './overview/power-factor-overview.component';
import { PowerFactorRoutingModule } from './power-factor-routing.module';

@NgModule({
    imports: [PowerFactorRoutingModule],
    exports: [],
    declarations: [PowerFactorDetailComponent, PowerFactorOverviewComponent],
    providers: []
})
export class PowerFactorModule {}

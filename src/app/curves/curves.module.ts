import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CurvesRoutingModule} from './curves-routing.module';
import {SharedModule} from '../shared/shared.module';
import { DashboardPopoverComponent } from './dashboard/dashboard-popover/dashboard-popover.component';



@NgModule({
  declarations: [DashboardComponent, DashboardPopoverComponent],
  imports: [
    SharedModule,
    CurvesRoutingModule
  ],
  entryComponents: [
    DashboardPopoverComponent
  ]
})
export class CurvesModule { }

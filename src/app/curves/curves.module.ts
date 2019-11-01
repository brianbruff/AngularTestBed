import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CurvesRoutingModule} from './curves-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CurvesRoutingModule
  ]
})
export class CurvesModule { }

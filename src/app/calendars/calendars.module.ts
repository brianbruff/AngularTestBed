import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CalendarsRoutingModule} from './calendars-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CalendarsRoutingModule
  ]
})
export class CalendarsModule { }

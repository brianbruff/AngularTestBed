import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'curves', loadChildren: () => import('./curves/curves.module').then(m => m.CurvesModule) },
  { path: 'calendars', loadChildren: () => import('./calendars/calendars.module').then(m => m.CalendarsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
